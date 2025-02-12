var DEGREE_TO_RAD = Math.PI / 180;

// Order of the groups in the XML document.
var SCENE_INDEX = 0;
var VIEWS_INDEX = 1;
var GLOBALS_INDEX = 2;
var LIGHTS_INDEX = 3;
var TEXTURES_INDEX = 4;
var MATERIALS_INDEX = 5;
var TRANSFORMATIONS_INDEX = 6;
var PRIMITIVES_INDEX = 7;
var COMPONENTS_INDEX = 8;

/**
 * MySceneGraph class, representing the scene graph.
 */
class MySceneGraph {
    /**
     * @constructor
     */
    constructor(filename, scene) {
        this.loadedOk = null;

        // Establish bidirectional references between scene and graph.
        this.scene = scene;
        scene.graph = this;
        this.materialIncrement = false;

        this.nodes = [];

        this.idRoot = null; // The id of the root element.

        this.axisCoords = [];
        this.axisCoords['x'] = [1, 0, 0];
        this.axisCoords['y'] = [0, 1, 0];
        this.axisCoords['z'] = [0, 0, 1];

        // File reading 
        this.reader = new CGFXMLreader();
        /*
         * Read the contents of the xml file, and refer to this class for loading and error handlers.
         * After the file is read, the reader calls onXMLReady on this object.
         * If any error occurs, the reader calls onXMLError on this object, with an error message
         */
        this.reader.open('scenes/' + filename, this);
    }

    /*
     * Callback to be executed after successful reading
     */
    onXMLReady() {
        this.log("XML Loading finished.");
        var rootElement = this.reader.xmlDoc.documentElement;


        // Here should go the calls for different functions to parse the various blocks
        var error = this.parseXMLFile(rootElement);

        if (error != null) {
            this.onXMLError(error);
            return;
        }

        this.loadedOk = true;

        // As the graph loaded ok, signal the scene so that any additional initialization depending on the graph can take place
        this.scene.graphs_loaded ++;
        this.scene.addGraph(this);
        if(this.scene.graphs_loaded == this.scene.n_gr)
            this.scene.onGraphLoaded();
    }

    /**
     * Parses the XML file, processing each block.
     * @param {XML root element} rootElement
     */
    parseXMLFile(rootElement) {
        if (rootElement.nodeName != "lxs")
            return "root tag <lxs> missing";

        var nodes = rootElement.children;

        // Reads the names of the nodes to an auxiliary buffer.
        var nodeNames = [];

        for (var i = 0; i < nodes.length; i++) {
            nodeNames.push(nodes[i].nodeName);
        }

        var error;

        // Processes each node, verifying errors.

        // <scene>
        var index;
        this.rootName = this.reader.getString(nodes[0], "root");
        if ((index = nodeNames.indexOf("scene")) == -1)
            return "tag <scene> missing";
        else {
            if (index != SCENE_INDEX)
                this.onXMLMinorError("tag <scene> out of order " + index);

            //Parse scene block
            if ((error = this.parseScene(nodes[index])) != null)
                return error;
        }

        // <views>
        if ((index = nodeNames.indexOf("views")) == -1)
            return "tag <views> missing";
        else {
            if (index != VIEWS_INDEX)
                this.onXMLMinorError("tag <views> out of order");

            //Parse views block
            if ((error = this.parseView(nodes[index])) != null)
                return error;
        }

        // <ambient>
        if ((index = nodeNames.indexOf("globals")) == -1)
            return "tag <globals> missing";
        else {
            if (index != GLOBALS_INDEX)
                this.onXMLMinorError("tag <globals> out of order");

            //Parse ambient block
            if ((error = this.parseAmbient(nodes[index])) != null)
                return error;
        }

        // <lights>
        if ((index = nodeNames.indexOf("lights")) == -1)
            return "tag <lights> missing";
        else {
            if (index != LIGHTS_INDEX)
                this.onXMLMinorError("tag <lights> out of order");

            //Parse lights block
            if ((error = this.parseLights(nodes[index])) != null)
                return error;
        }
        // <textures>
        if ((index = nodeNames.indexOf("textures")) == -1)
            return "tag <textures> missing";
        else {
            if (index != TEXTURES_INDEX)
                this.onXMLMinorError("tag <textures> out of order");


            //Parse textures block
            if ((error = this.parseTextures(nodes[index])) != null)
                return error;
        }

        // <materials>
        if ((index = nodeNames.indexOf("materials")) == -1)
            return "tag <materials> missing";
        else {
            if (index != MATERIALS_INDEX)
                this.onXMLMinorError("tag <materials> out of order");

            //Parse materials block
            if ((error = this.parseMaterials(nodes[index])) != null)
                return error;
        }

        // <transformations>
        if ((index = nodeNames.indexOf("transformations")) == -1)
            return "tag <transformations> missing";
        else {
            if (index != TRANSFORMATIONS_INDEX)
                this.onXMLMinorError("tag <transformations> out of order");

            //Parse transformations block
            if ((error = this.parseTransformations(nodes[index])) != null)
                return error;
        }

        // <animations>
        if ((index = nodeNames.indexOf("animations")) == -1)
            return "tag <animations> missing";
        else {
            if (index != TRANSFORMATIONS_INDEX)
                this.onXMLMinorError("tag <animations> out of order");

            //Parse transformations block
            if ((error = this.parseAnimations(nodes[index])) != null)
                return error;
        }


        // <primitives>
        if ((index = nodeNames.indexOf("primitives")) == -1)
            return "tag <primitives> missing";
        else {
            if (index != PRIMITIVES_INDEX)
                this.onXMLMinorError("tag <primitives> out of order");

            //Parse primitives block
            if ((error = this.parsePrimitives(nodes[index])) != null)
                return error;
        }

        // <components>
        if ((index = nodeNames.indexOf("components")) == -1)
            return "tag <components> missing";
        else {
            if (index != COMPONENTS_INDEX)
                this.onXMLMinorError("tag <components> out of order");

            //Parse components block
            if ((error = this.parseComponents(nodes[index])) != null)
                return error;
        }



        this.log("all parsed");
    }

    /**
     * Parses the <scene> block. 
     * @param {scene block element} sceneNode
     */
    parseScene(sceneNode) {

        // Get root of the scene.
        var root = this.reader.getString(sceneNode, 'root');
        if (root == null)
            return "no root defined for scene";

        this.idRoot = root;

        // Get axis length        
        var axis_length = this.reader.getFloat(sceneNode, 'axis_length');
        if (axis_length == null)
            this.onXMLMinorError("no axis_length defined for scene; assuming 'length = 1'");

        this.referenceLength = axis_length || 1;

        this.log("Parsed scene");

        return null;
    }

    /**
     * Parses the <views> block.
     * @param {view block element} viewsNode
     */
    parseView(viewsNode) {

        var children = viewsNode.children;
        this.listCameras = [];
        this.defaultView = this.reader.getString(viewsNode, "default");

        for (var i = 0; i < children.length; i++) {
            if (children[i].nodeName != "perspective" && children[i].nodeName != "ortho") {
                this.onXMLError("unknown tag <" + children[i].nodeName + ">");
                continue;
            }
            if (children[i].tagName == "perspective") {
                var grandchildren = children[i].children;

                var from = [this.reader.getFloat(grandchildren[0], "x"),
                    this.reader.getFloat(grandchildren[0], "y"),
                    this.reader.getFloat(grandchildren[0], "z")
                ];

                var to = [this.reader.getFloat(grandchildren[1], "x"),
                    this.reader.getFloat(grandchildren[1], "y"),
                    this.reader.getFloat(grandchildren[1], "z")
                ];


                this.listCameras[this.reader.getString(children[i], "id")] = new CGFcamera(this.reader.getFloat(children[i], "angle"),
                    this.reader.getFloat(children[i], "near"),
                    this.reader.getFloat(children[i], "far"),
                    from, to);
            }

            if (children[i].tagName == "ortho") {
                var grandchildren = children[i].children;

                var from = [this.reader.getFloat(grandchildren[0], "x"),
                    this.reader.getFloat(grandchildren[0], "y"),
                    this.reader.getFloat(grandchildren[0], "z")
                ];

                var to = [this.reader.getFloat(grandchildren[1], "x"),
                    this.reader.getFloat(grandchildren[1], "y"),
                    this.reader.getFloat(grandchildren[1], "z")
                ];

                var up = [this.reader.getFloat(grandchildren[2], "x"),
                    this.reader.getFloat(grandchildren[2], "y"),
                    this.reader.getFloat(grandchildren[2], "z")
                ];

                this.listCameras[this.reader.getString(children[i], "id")] = new CGFcameraOrtho(
                    this.reader.getFloat(children[i], "left"),
                    this.reader.getFloat(children[i], "right"),
                    this.reader.getFloat(children[i], "bottom"),
                    this.reader.getFloat(children[i], "top"),
                    this.reader.getFloat(children[i], "near"),
                    this.reader.getFloat(children[i], "far"),

                    from, to, up);
            }
        }

        return null;
    }

    /**
     * Parses the <ambient> node.
     * @param {ambient block element} ambientsNode
     */
    parseAmbient(ambientsNode) {

        var children = ambientsNode.children;

        this.ambient = [];
        this.background = [];

        var nodeNames = [];

        for (var i = 0; i < children.length; i++)
            nodeNames.push(children[i].nodeName);

        var ambientIndex = nodeNames.indexOf("ambient");
        var backgroundIndex = nodeNames.indexOf("background");

        var color = this.parseColor(children[ambientIndex], "ambient");
        if (!Array.isArray(color))
            return color;
        else
            this.ambient = color;

        color = this.parseColor(children[backgroundIndex], "background");
        if (!Array.isArray(color))
            return color;
        else
            this.background = color;

        this.log("Parsed ambient");

        return null;
    }

    /**
     * Parses the <light> node.
     * @param {lights block element} lightsNode
     */
    parseLights(lightsNode) {
        var children = lightsNode.children;

        this.lights = [];
        var numLights = 0;

        var grandChildren = [];
        var nodeNames = [];

        // Any number of lights.
        for (var i = 0; i < children.length; i++) {

            // Storing light information
            var global = [];
            var attributeNames = [];
            var attributeTypes = [];

            //Check type of light
            if (children[i].nodeName != "omni" && children[i].nodeName != "spot") {
                this.onXMLMinorError("unknown tag <" + children[i].nodeName + ">");
                continue;
            } else {
                attributeNames.push(...["location", "ambient", "diffuse", "specular"]);
                attributeTypes.push(...["position", "color", "color", "color"]);
            }

            // Get id of the current light.
            var lightId = this.reader.getString(children[i], 'id');
            if (lightId == null)
                return "no ID defined for light";

            // Checks for repeated IDs.
            if (this.lights[lightId] != null)
                return "ID must be unique for each light (conflict: ID = " + lightId + ")";

            // Light enable/disable
            var enableLight = true;
            var aux = this.reader.getBoolean(children[i], 'enabled');
            if (!(aux != null && !isNaN(aux) && (aux == true || aux == false)))
                this.onXMLMinorError("unable to parse value component of the 'enable light' field for ID = " + lightId + "; assuming 'value = 1'");

            enableLight = aux || 1;

            //Add enabled boolean and type name to light info
            global.push(enableLight);
            global.push(children[i].nodeName);

            grandChildren = children[i].children;
            // Specifications for the current light.

            nodeNames = [];
            for (var j = 0; j < grandChildren.length; j++) {
                nodeNames.push(grandChildren[j].nodeName);
            }

            for (var j = 0; j < attributeNames.length; j++) {
                var attributeIndex = nodeNames.indexOf(attributeNames[j]);

                if (attributeIndex != -1) {
                    if (attributeTypes[j] == "position")
                        var aux = this.parseCoordinates4D(grandChildren[attributeIndex], "light position for ID" + lightId);
                    else
                        var aux = this.parseColor(grandChildren[attributeIndex], attributeNames[j] + " illumination for ID" + lightId);

                    if (!Array.isArray(aux))
                        return aux;

                    global.push(aux);
                } else
                    return "light " + attributeNames[i] + " undefined for ID = " + lightId;
            }

            // Gets the additional attributes of the spot light
            if (children[i].nodeName == "spot") {
                var angle = this.reader.getFloat(children[i], 'angle');
                if (!(angle != null && !isNaN(angle)))
                    return "unable to parse angle of the light for ID = " + lightId;

                var exponent = this.reader.getFloat(children[i], 'exponent');
                if (!(exponent != null && !isNaN(exponent)))
                    return "unable to parse exponent of the light for ID = " + lightId;

                var targetIndex = nodeNames.indexOf("target");

                // Retrieves the light target.
                var targetLight = [];
                if (targetIndex != -1) {
                    var aux = this.parseCoordinates3D(grandChildren[targetIndex], "target light for ID " + lightId);
                    if (!Array.isArray(aux))
                        return aux;

                    targetLight = aux;
                } else
                    return "light target undefined for ID = " + lightId;

                global.push(...[angle, exponent, targetLight])
            }

            this.lights[lightId] = global;
            numLights++;
        }

        if (numLights == 0)
            return "at least one light must be defined";
        else if (numLights > 8)
            this.onXMLMinorError("too many lights defined; WebGL imposes a limit of 8 lights");

        this.log("Parsed lights");
        return null;
    }

    /**
     * Parses the <textures> block. 
     * @param {textures block element} texturesNode
     */
    parseTextures(texturesNode) {

        //For each texture in textures block, check ID and file URL
        var children = texturesNode.children;
        this.textures = [];
        for (var i = 0; i < children.length; i++) {
            if (children[i].nodeName != "texture") {
                this.onXMLMinorError("unknown tag <" + children[i].nodeName + ">");
                continue;
            }
            var textureID = this.reader.getString(children[i], 'id');
            if (textureID == null)
                return "no ID defined for texture";
            // Checks for repeated IDs.
            if (this.textures[textureID] != null)
                return "ID must be unique for each light (conflict: ID = " + materialID + ")";

            var fileURL = this.reader.getString(children[i], 'file');
            this.textures[textureID] = fileURL;
        }

        this.log("Parsed textures");
        return null;
    }

    /**
     * Parses the <materials> node.
     * @param {materials block element} materialsNode
     */
    parseMaterials(materialsNode) {
        var children = materialsNode.children;

        this.materials = [];

        var grandChildren = [];
        var nodeNames = [];

        // Any number of materials.
        for (var i = 0; i < children.length; i++) {

            if (children[i].nodeName != "material") {
                this.onXMLMinorError("unknown tag <" + children[i].nodeName + ">");
                continue;
            }

            // Get id of the current material.
            var materialID = this.reader.getString(children[i], 'id');
            if (materialID == null)
                return "no ID defined for material";

            // Checks for repeated IDs.
            if (this.materials[materialID] != null)
                return "ID must be unique for each light (conflict: ID = " + materialID + ")";

            //Continue here
            grandChildren = children[i].children;

            this.materials[materialID] = grandChildren;

        }

        //this.log("Parsed materials");
        return null;
    }

    /**
     * Parses the <transformations> block.
     * @param {transformations block element} transformationsNode
     */
    parseTransformations(transformationsNode) {
        var children = transformationsNode.children;

        this.transformations = [];

        var grandChildren = [];

        // Any number of transformations.
        for (var i = 0; i < children.length; i++) {

            if (children[i].nodeName != "transformation") {
                this.onXMLMinorError("unknown tag <" + children[i].nodeName + ">");
                continue;
            }

            // Get id of the current transformation.
            var transformationID = this.reader.getString(children[i], 'id');
            if (transformationID == null)
                return "no ID defined for transformation";

            // Checks for repeated IDs.
            if (this.transformations[transformationID] != null)
                return "ID must be unique for each transformation (conflict: ID = " + transformationID + ")";

            grandChildren = children[i].children;
            // Specifications for the current transformation.

            var transfMatrix = mat4.create();

            for (var j = 0; j < grandChildren.length; j++) {
                switch (grandChildren[j].nodeName) {
                    case 'translate':
                        var coordinates = this.parseCoordinates3D(grandChildren[j], "translate transformation for ID " + transformationID);
                        if (!Array.isArray(coordinates))
                            return coordinates;

                        transfMatrix = mat4.translate(transfMatrix, transfMatrix, coordinates);
                        break;
                    case 'scale':
                        var coordinates = this.parseCoordinates3D(grandChildren[j], "scale transformation for ID " + transformationID);
                        if (!Array.isArray(coordinates))
                            return coordinates;

                        transfMatrix = mat4.scale(transfMatrix, transfMatrix, coordinates);
                        break;
                    case 'rotate':
                        // angle
                        var axis = this.reader.getString(grandChildren[j], 'axis');
                        var vec = [];
                        switch (axis) {
                            case 'x':
                                vec = [1, 0, 0];
                                break;
                            case 'y':
                                vec = [0, 1, 0];
                                break;
                            case 'z':
                                vec = [0, 0, 1];
                                break;
                        }
                        var ang = DEGREE_TO_RAD * this.reader.getFloat(grandChildren[j], 'angle');
                        transfMatrix = mat4.rotate(transfMatrix, transfMatrix, ang, vec);
                        break;
                }
            }
            this.transformations[transformationID] = transfMatrix;
        }

        this.log("Parsed transformations");
        return null;
    }

    /**
     * Parses the <transformations> block.
     * @param {animations block element} animationsNode
     */
    parseAnimations(animationsNode) {
        var children = animationsNode.children;

        this.animations = [];
        this.keyTransformations = [];

        var grandChildren = [];
        var grandgrandChildren = [];

        // Any number of transformations.
        for (var i = 0; i < children.length; i++) {

            if (children[i].nodeName != "animation") {
                this.onXMLMinorError("unknown tag <" + children[i].nodeName + ">");
                continue;
            }

            // Get id of the current transformation.
            var animationID = this.reader.getString(children[i], 'id');
            if (animationID == null)
                return "no ID defined for animation";

            // Checks for repeated IDs.
            if (this.animations[animationID] != null)
                return "ID must be unique for each animation (conflict: ID = " + animationID + ")";

            this.animations[animationID] = new MyKeyFrameAnimation(this.scene);
            grandChildren = children[i].children;
            // keyFrames = grandChildren;
            // Specifications for the current transformation.

            for (var k = 0; k < grandChildren.length; k++) {
                var keyframeinst = this.reader.getFloat(grandChildren[k], 'instant');
                if (keyframeinst == null)
                    return "no KeyFrame defined for animation";
                var keyframe = [];
                keyframe.push(keyframeinst);
                this.keyTransformations = grandChildren[k].children;
                let transf = [];
                let sca = [];
                let rot = [];
                transf.push(this.reader.getFloat(this.keyTransformations[0], 'x'));
                transf.push(this.reader.getFloat(this.keyTransformations[0], 'y'));
                transf.push(this.reader.getFloat(this.keyTransformations[0], 'z'));
                keyframe.push(transf);
                
                rot.push(this.reader.getFloat(this.keyTransformations[1], 'angle_x'));
                rot.push(this.reader.getFloat(this.keyTransformations[1], 'angle_y'));
                rot.push(this.reader.getFloat(this.keyTransformations[1], 'angle_z'));
                keyframe.push(rot);
                
                sca.push(this.reader.getFloat(this.keyTransformations[2], 'x'));
                sca.push(this.reader.getFloat(this.keyTransformations[2], 'y'));
                sca.push(this.reader.getFloat(this.keyTransformations[2], 'z'));
                keyframe.push(sca);

                // console.log(keyframe);

                /*  for (var j = 0; j < this.keyTransformations.length; j++) {
                     var transf = [];
                     switch (this.keyTransformations[j].nodeName) {
                         case 'translate':
                             transf.push(this.reader.getFloat(this.keyTransformations[j], 'x'));
                             transf.push(this.reader.getFloat(this.keyTransformations[j], 'y'));
                             transf.push(this.reader.getFloat(this.keyTransformations[j], 'z'));
                             break;
                         case 'scale':
                             transf.push(this.reader.getFloat(this.keyTransformations[j], 'x'));
                             transf.push(this.reader.getFloat(this.keyTransformations[j], 'y'));
                             transf.push(this.reader.getFloat(this.keyTransformations[j], 'z'));
                             break;
                         case 'rotate':
                             // angle
                             var ang = this.reader.getFloat(this.keyTransformations[j], 'angle_x');
                             if(ang == null)
                                 return "Rotation must be defined for 3 axis";
                             transf.push(ang);

                             ang = this.reader.getFloat(this.keyTransformations[j], 'angle_y');
                             if(ang == null)
                                 return "Rotation must be defined for 3 axis";
                             transf.push(ang);

                             ang = this.reader.getFloat(this.keyTransformations[j], 'angle_z');
                             if(ang == null)
                                 return "Rotation must be defined for 3 axis";
                             transf.push(ang);
                             break;
                     }
                     keyframe.push(transf);
                 }*/
                this.animations[animationID].keyFrames.push(keyframe);

            }

        }

        this.log("Parsed animations");
        return null;
    }

    /**
     * Parses the <primitives> block.
     * @param {primitives block element} primitivesNode
     */
    parsePrimitives(primitivesNode) {
        var children = primitivesNode.children;

        this.primitives = [];

        var grandChildren = [];

        // Any number of primitives.
        for (var i = 0; i < children.length; i++) {

            if (children[i].nodeName != "primitive") {
                this.onXMLMinorError("unknown tag <" + children[i].nodeName + ">");
                continue;
            }

            // Get id of the current primitive.
            var primitiveId = this.reader.getString(children[i], 'id');
            if (primitiveId == null)
                return "no ID defined for texture";

            // Checks for repeated IDs.
            if (this.primitives[primitiveId] != null)
                return "ID must be unique for each primitive (conflict: ID = " + primitiveId + ")";

            grandChildren = children[i].children;

            // Validate the primitive type
            if (grandChildren.length != 1 ||
                (grandChildren[0].nodeName != 'rectangle' && grandChildren[0].nodeName != 'triangle' &&
                    grandChildren[0].nodeName != 'cylinder' && grandChildren[0].nodeName != 'sphere' &&
                    grandChildren[0].nodeName != 'torus' && grandChildren[0].nodeName != 'plane' && 
                    grandChildren[0].nodeName != 'patch' && grandChildren[0].nodeName != 'cylinder2')) {
                return "There must be exactly 1 primitive type (rectangle, triangle, cylinder, sphere or torus)"
            }

            // Specifications for the current primitive.
            var primitiveType = grandChildren[0].nodeName;

            // Retrieves the primitive coordinates.
            if (primitiveType == 'rectangle') {
                // x1
                var x1 = this.reader.getFloat(grandChildren[0], 'x1');
                if (!(x1 != null && !isNaN(x1)))
                    return "unable to parse x1 of the primitive coordinates for ID = " + primitiveId;

                // y1
                var y1 = this.reader.getFloat(grandChildren[0], 'y1');
                if (!(y1 != null && !isNaN(y1)))
                    return "unable to parse y1 of the primitive coordinates for ID = " + primitiveId;

                // x2
                var x2 = this.reader.getFloat(grandChildren[0], 'x2');
                if (!(x2 != null && !isNaN(x2) && x2 > x1))
                    return "unable to parse x2 of the primitive coordinates for ID = " + primitiveId;

                // y2
                var y2 = this.reader.getFloat(grandChildren[0], 'y2');
                if (!(y2 != null && !isNaN(y2) && y2 > y1))
                    return "unable to parse y2 of the primitive coordinates for ID = " + primitiveId;

                var rect = new MyRectangle(this.scene, primitiveId, x1, x2, y1, y2);

                this.primitives[primitiveId] = rect;
            } else if (primitiveType == 'cylinder') {
                //base
                var base = this.reader.getFloat(grandChildren[0], 'base');
                if (!(base != null && !isNaN(base)))
                    return "unable to parse base of the primitive coordinates for ID = " + primitiveId;

                //top
                var top = this.reader.getFloat(grandChildren[0], 'top');
                if (!(top != null && !isNaN(top)))
                    return "unable to parse top of the primitive coordinates for ID = " + primitiveId;

                //height
                var height = this.reader.getFloat(grandChildren[0], 'height');
                if (!(height != null && !isNaN(height)))
                    return "unable to parse top of the primitive coordinates for ID = " + primitiveId;
                //slices
                var slices = this.reader.getFloat(grandChildren[0], 'slices');
                if (!(slices != null && !isNaN(slices)))
                    return "unable to parse base of the primitive coordinates for ID = " + primitiveId;
                //base
                var stacks = this.reader.getFloat(grandChildren[0], 'stacks');
                if (!(stacks != null && !isNaN(stacks)))
                    return "unable to parse base of the primitive coordinates for ID = " + primitiveId;

                var cyl = new MyCylinder(this.scene, primitiveId, base, top, height, slices, stacks);

                this.primitives[primitiveId] = cyl;

            } else if (primitiveType == 'triangle') {
                //x1
                var x1 = this.reader.getFloat(grandChildren[0], 'x1');
                if (!(x1 != null && !isNaN(x1)))
                    return "unable to parse base of the primitive coordinates for ID = " + primitiveId;
                //y1
                var y1 = this.reader.getFloat(grandChildren[0], 'y1');
                if (!(y1 != null && !isNaN(y1)))
                    return "unable to parse base of the primitive coordinates for ID = " + primitiveId;
                //z1
                var z1 = this.reader.getFloat(grandChildren[0], 'z1');
                if (!(z1 != null && !isNaN(z1)))
                    return "unable to parse base of the primitive coordinates for ID = " + primitiveId;
                //x2
                var x2 = this.reader.getFloat(grandChildren[0], 'x2');
                if (!(x2 != null && !isNaN(x2)))
                    return "unable to parse base of the primitive coordinates for ID = " + primitiveId;
                //y2
                var y2 = this.reader.getFloat(grandChildren[0], 'y2');
                if (!(y2 != null && !isNaN(y2)))
                    return "unable to parse base of the primitive coordinates for ID = " + primitiveId;
                //z2
                var z2 = this.reader.getFloat(grandChildren[0], 'z2');
                if (!(z2 != null && !isNaN(z2)))
                    return "unable to parse base of the primitive coordinates for ID = " + primitiveId;
                //x3
                var x3 = this.reader.getFloat(grandChildren[0], 'x3');
                if (!(x3 != null && !isNaN(x3)))
                    return "unable to parse base of the primitive coordinates for ID = " + primitiveId;
                //y3
                var y3 = this.reader.getFloat(grandChildren[0], 'y3');
                if (!(y3 != null && !isNaN(y3)))
                    return "unable to parse base of the primitive coordinates for ID = " + primitiveId;
                //z3
                var z3 = this.reader.getFloat(grandChildren[0], 'z3');
                if (!(z3 != null && !isNaN(z3)))
                    return "unable to parse base of the primitive coordinates for ID = " + primitiveId;

                var triangle = new MyTriangle(this.scene, primitiveId, x1, y1, z1, x2, y2, z2, x3, y3, z3);

                this.primitives[primitiveId] = triangle;

            } else if (primitiveType == 'sphere') {
                //radius
                var radius = this.reader.getFloat(grandChildren[0], 'radius');
                if (!(radius != null && !isNaN(radius)))
                    return "unable to parse base of the primitive coordinates for ID = " + primitiveId;
                //slices
                var slices = this.reader.getFloat(grandChildren[0], 'slices');
                if (!(slices != null && !isNaN(slices)))
                    return "unable to parse base of the primitive coordinates for ID = " + primitiveId;
                //stacks
                var stacks = this.reader.getFloat(grandChildren[0], 'stacks');
                if (!(stacks != null && !isNaN(stacks)))
                    return "unable to parse base of the primitive coordinates for ID = " + primitiveId;

                var sphere = new MySphere(this.scene, primitiveId, radius, slices, stacks);

                this.primitives[primitiveId] = sphere;

            } else if (primitiveType == 'torus') {
                //outradius
                var outradius = this.reader.getFloat(grandChildren[0], 'outer');
                if (!(outradius != null && !isNaN(outradius)))
                    return "unable to parse base of the primitive coordinates for ID = " + primitiveId;

                //inradius
                var inradius = this.reader.getFloat(grandChildren[0], 'inner');
                if (!(inradius != null && !isNaN(inradius)))
                    return "unable to parse base of the primitive coordinates for ID = " + primitiveId;
                //slices
                var slices = this.reader.getFloat(grandChildren[0], 'slices');
                if (!(slices != null && !isNaN(slices)))
                    return "unable to parse base of the primitive coordinates for ID = " + primitiveId;
                //loops
                var loops = this.reader.getFloat(grandChildren[0], 'loops');
                if (!(loops != null && !isNaN(loops)))
                    return "unable to parse base of the primitive coordinates for ID = " + primitiveId;

                var torus = new MyTorus(this.scene, primitiveId, outradius, inradius, slices, loops);

                this.primitives[primitiveId] = torus;

            }else if(primitiveType == 'plane'){
                //nDivisionsU
                var nDivisionsU = this.reader.getFloat(grandChildren[0], 'nDivisionsU');
                if (!(nDivisionsU != null && !isNaN(nDivisionsU)))
                    return "unable to parse base of the primitive coordinates for ID = " + primitiveId;
                //nDivisionsV
                var nDivisionsV = this.reader.getFloat(grandChildren[0], 'nDivisionsV');
                if (!(nDivisionsV != null && !isNaN(nDivisionsV)))
                    return "unable to parse base of the primitive coordinates for ID = " + primitiveId;
                //degree1
                var degree1 = this.reader.getFloat(grandChildren[0], 'degree1');
                if (!(degree1 != null && !isNaN(degree1)))
                    return "unable to parse base of the primitive coordinates for ID = " + primitiveId;
                //degree2
                var degree2 = this.reader.getFloat(grandChildren[0], 'degree2');
                if (!(degree2 != null && !isNaN(degree2)))
                    return "unable to parse base of the primitive coordinates for ID = " + primitiveId;

                var plane = new MyPlane(this.scene, primitiveId, nDivisionsU, nDivisionsV, degree1, degree2);

                this.primitives[primitiveId] = plane;
            }else if(primitiveType == 'patch'){
                //nDivisionsU
                var nDivisionsU = this.reader.getFloat(grandChildren[0], 'nDivisionsU');
                if (!(nDivisionsU != null && !isNaN(nDivisionsU)))
                    return "unable to parse base of the primitive coordinates for ID = " + primitiveId;
                //nDivisionsV
                var nDivisionsV = this.reader.getFloat(grandChildren[0], 'nDivisionsV');
                if (!(nDivisionsV != null && !isNaN(nDivisionsV)))
                    return "unable to parse base of the primitive coordinates for ID = " + primitiveId;
                //degree1
                var degree1 = this.reader.getFloat(grandChildren[0], 'degree1');
                if (!(degree1 != null && !isNaN(degree1)))
                    return "unable to parse base of the primitive coordinates for ID = " + primitiveId;
                //degree2
                var degree2 = this.reader.getFloat(grandChildren[0], 'degree2');
                if (!(degree2 != null && !isNaN(degree2)))
                    return "unable to parse base of the primitive coordinates for ID = " + primitiveId;

                var patch = new MyPatch(this.scene, primitiveId, nDivisionsU, nDivisionsV, degree1, degree2);

                this.primitives[primitiveId] = patch;
            }else if(primitiveType == 'cylinder2'){
                //slices

                var base = this.reader.getFloat(grandChildren[0], 'base');
                if (!(base != null && !isNaN(base)))
                    return "unable to parse base of the primitive coordinates for ID = " + primitiveId;

                //top
                var top = this.reader.getFloat(grandChildren[0], 'top');
                if (!(top != null && !isNaN(top)))
                    return "unable to parse top of the primitive coordinates for ID = " + primitiveId;

                //height
                var height = this.reader.getFloat(grandChildren[0], 'height');
                if (!(height != null && !isNaN(height)))
                    return "unable to parse top of the primitive coordinates for ID = " + primitiveId;
                var slices = this.reader.getFloat(grandChildren[0], 'slices');
                if (!(slices != null && !isNaN(slices)))
                    return "unable to parse base of the primitive coordinates for ID = " + primitiveId;
                //stacks
                var stacks = this.reader.getFloat(grandChildren[0], 'stacks');
                if (!(stacks != null && !isNaN(stacks)))
                    return "unable to parse base of the primitive coordinates for ID = " + primitiveId;

                var cylinder2 = new MyNurbsCylinder(this.scene, primitiveId, base, top, height, slices, stacks);

                this.primitives[primitiveId] = cylinder2;
            }

        }

        this.log("Parsed primitives");
        return null;
    }

    /**
     * Parses the <components> block.
     * @param {components block element} componentsNode
     */
    parseComponents(componentsNode) {
        var children = componentsNode.children;
        var matr = [];
        this.components = [];

        var grandChildren = [];
        var grandgrandChildren = [];
        var nodeNames = [];

        var primitiveInd;
        var textureInd = null;
        var transformationID;
        var matID;
        var animationInd = null;

        // Any number of components.
        for (var i = 0; i < children.length; i++) {

            var transfMatrix = mat4.create();

            if (children[i].nodeName != "component") {
                this.onXMLMinorError("unknown tag <" + children[i].nodeName + ">");
                continue;
            }

            // Get id of the current component.
            var componentID = this.reader.getString(children[i], 'id');
            if (componentID == null)
                return "no ID defined for componentID";
            console.log(componentID);
            // Checks for repeated IDs.
            if (this.components[componentID] != null)
                return "ID must be unique for each component (conflict: ID = " + componentID + ")";

            grandChildren = children[i].children;

            nodeNames = [];
            for (var j = 0; j < grandChildren.length; j++) {
                nodeNames.push(grandChildren[j].nodeName);
            }

            var transformationIndex = nodeNames.indexOf("transformation");
            var materialsIndex = nodeNames.indexOf("materials");
            var textureIndex = nodeNames.indexOf("texture");
            var childrenIndex = nodeNames.indexOf("children");
            var animationIndex = nodeNames.indexOf("animationref");
            var animation = "a";
            //console.log(animationIndex);
            if (animationIndex > 0) {
                if (this.reader.getString(grandChildren[animationIndex], 'id') != null) {
                    animationInd = this.reader.getString(grandChildren[animationIndex], 'id');
                     if(this.animations[animationInd] == null)
                         continue;
                     else{
                     animation = this.animations[animationInd];
                    } 

                }
            }

            textureInd = this.reader.getString(grandChildren[textureIndex], 'id');
            if (this.textures[textureInd] == null && textureInd != "inherit" && textureInd != "none") {
                return "no ID defined for textureID";
            } else {
                var texture;
                if (textureInd == "inherit") {
                    texture = "inherit";
                } else if (textureInd == "none") {
                    texture = "none";
                } else {
                    var length_s = this.reader.getFloat(grandChildren[textureIndex], 'length_s');
                    var length_t = this.reader.getFloat(grandChildren[textureIndex], 'length_t');

                    //this.nodes[componentID].textureID.push(textureInd);
                    // this.textures[textureInd].push(length_s);
                    // this.textures[textureInd].push(length_t);
                    texture = new CGFtexture(this.scene, this.textures[textureInd], length_s, length_t);

                    //texture.bind();
                }
            }

            var componentMaterials = [];
            grandgrandChildren = grandChildren[materialsIndex].children;
            for (j = 0; j < grandgrandChildren.length; j++) {
                matID = this.reader.getString(grandgrandChildren[j], 'id');
                if (matID == null && matID != "inherit") {
                    return "no ID defined for material ID";
                } else {
                    var material;
                    if (matID == "inherit") {
                        material = "inherit";
                    } else {
                        material = new CGFappearance(this.scene);

                        var materialsChildren = this.materials[matID];
                        material.setEmission(this.reader.getFloat(materialsChildren[0], "r"), this.reader.getFloat(materialsChildren[0], "g"),
                            this.reader.getFloat(materialsChildren[0], "b"), this.reader.getFloat(materialsChildren[0], "a"));
                        material.setAmbient(this.reader.getFloat(materialsChildren[1], "r"), this.reader.getFloat(materialsChildren[1], "g"),
                            this.reader.getFloat(materialsChildren[1], "b"), this.reader.getFloat(materialsChildren[1], "a"));
                        material.setDiffuse(this.reader.getFloat(materialsChildren[2], "r"), this.reader.getFloat(materialsChildren[2], "g"),
                            this.reader.getFloat(materialsChildren[2], "b"), this.reader.getFloat(materialsChildren[2], "a"));
                        material.setSpecular(this.reader.getFloat(materialsChildren[3], "r"), this.reader.getFloat(materialsChildren[3], "g"),
                            this.reader.getFloat(materialsChildren[3], "b"), this.reader.getFloat(materialsChildren[3], "a"));

                        componentMaterials[matID] = material;
                    }
                }
            }

            var firstMaterial = 0;


            grandgrandChildren = grandChildren[transformationIndex].children;
            for (var k = 0; k < grandgrandChildren.length; k++) {
                if (grandgrandChildren[k].nodeName == 'transformationref') {
                    transformationID = this.transformations[this.reader.getString(grandgrandChildren[k], 'id')];
                    if (transformationID == null)
                        return "no ID defined for transformationID";

                    transfMatrix = transformationID;

                } else {
                    switch (grandgrandChildren[k].nodeName) {
                        case 'translate':
                            var coordinates = this.parseCoordinates3D(grandgrandChildren[k], "translate transformation for ID " + transformationID);
                            if (!Array.isArray(coordinates))
                                return coordinates;
                            transfMatrix = mat4.translate(transfMatrix, transfMatrix, coordinates);
                            break;
                        case 'scale':
                            var coordinates = this.parseCoordinates3D(grandgrandChildren[k], "scale transformation for ID " + transformationID);
                            if (!Array.isArray(coordinates))
                                return coordinates;
                            transfMatrix = mat4.scale(transfMatrix, transfMatrix, coordinates);
                            break;
                        case 'rotate':
                            // angle
                            var axis = this.reader.getString(grandgrandChildren[k], 'axis');
                            var vec = [];
                            switch (axis) {
                                case 'x':
                                    vec = [1, 0, 0];
                                    break;
                                case 'y':
                                    vec = [0, 1, 0];
                                    break;
                                case 'z':
                                    vec = [0, 0, 1];
                                    break;
                            }
                            var ang = DEGREE_TO_RAD * this.reader.getFloat(grandgrandChildren[k], 'angle');
                            transfMatrix = mat4.rotate(transfMatrix, transfMatrix, ang, vec);
                            break;
                    }
                }
            }


            grandgrandChildren = grandChildren[childrenIndex].children;
            for (var k = 0; k < grandgrandChildren.length; k++) {
                if (grandgrandChildren[k].nodeName == 'primitiveref') {
                    primitiveInd = this.primitives[this.reader.getString(grandgrandChildren[k], 'id')];
                    if (primitiveInd == null)
                        return "no ID defined for primitiveID";
                    //this.primitives[primitiveInd]
                } else if (grandgrandChildren[k].nodeName == 'componentref') {
                    //this.parseComponents(grandgrandChildren[k]);
                } else {
                    this.onXMLMinorError("unknown tag <" + children[k].nodeName + ">");
                    continue;
                }
            }

            this.components.push(componentID, transfMatrix, componentMaterials, firstMaterial, texture, grandgrandChildren, animation);
        }
    }



    /**
     * Parse the coordinates from a node with ID = id
     * @param {block element} node
     * @param {message to be displayed in case of error} messageError
     */
    parseCoordinates3D(node, messageError) {
        var position = [];

        // x
        var x = this.reader.getFloat(node, 'x');
        if (!(x != null && !isNaN(x)))
            return "unable to parse x-coordinate of the " + messageError;

        // y
        var y = this.reader.getFloat(node, 'y');
        if (!(y != null && !isNaN(y)))
            return "unable to parse y-coordinate of the " + messageError;

        // z
        var z = this.reader.getFloat(node, 'z');
        if (!(z != null && !isNaN(z)))
            return "unable to parse z-coordinate of the " + messageError;

        position.push(...[x, y, z]);

        return position;
    }

    /**
     * Parse the coordinates from a node with ID = id
     * @param {block element} node
     * @param {message to be displayed in case of error} messageError
     */
    parseCoordinates4D(node, messageError) {
        var position = [];

        //Get x, y, z
        position = this.parseCoordinates3D(node, messageError);

        if (!Array.isArray(position))
            return position;


        // w
        var w = this.reader.getFloat(node, 'w');
        if (!(w != null && !isNaN(w)))
            return "unable to parse w-coordinate of the " + messageError;

        position.push(w);

        return position;
    }

    /**
     * Parse the color components from a node
     * @param {block element} node
     * @param {message to be displayed in case of error} messageError
     */
    parseColor(node, messageError) {
        var color = [];

        // R
        var r = this.reader.getFloat(node, 'r');
        if (!(r != null && !isNaN(r) && r >= 0 && r <= 1))
            return "unable to parse R component of the " + messageError;

        // G
        var g = this.reader.getFloat(node, 'g');
        if (!(g != null && !isNaN(g) && g >= 0 && g <= 1))
            return "unable to parse G component of the " + messageError;

        // B
        var b = this.reader.getFloat(node, 'b');
        if (!(b != null && !isNaN(b) && b >= 0 && b <= 1))
            return "unable to parse B component of the " + messageError;

        // A
        var a = this.reader.getFloat(node, 'a');
        if (!(a != null && !isNaN(a) && a >= 0 && a <= 1))
            return "unable to parse A component of the " + messageError;

        color.push(...[r, g, b, a]);

        return color;
    }

    /*
     * Callback to be executed on any read error, showing an error on the console.
     * @param {string} message
     */
    onXMLError(message) {
        console.error("XML Loading Error: " + message);
        this.loadedOk = false;
    }

    /**
     * Callback to be executed on any minor error, showing a warning on the console.
     * @param {string} message
     */
    onXMLMinorError(message) {
        console.warn("Warning: " + message);
    }

    /**
     * Callback to be executed on any message.
     * @param {string} message
     */
    log(message) {
        console.log("   " + message);
    }

    checkMaterialsSize(materials, material) {
        var c = 0;
        for (var m in materials) {
            c++;
        }
        return material < c - 1;
    }

    getViews() {
        return this.listCameras;
    }

    /**
     * Displays the scene, processing each node, starting in the root node.
     */
    displayScene(id, transf, mats, text, ani) {
        //To do: Create display loop for transversing the scene graph

        //To test the parsing/creation of the primitives, call the display function directly

        // this.primitives['triangle'].display();
        var texture;
        var ani;
        var materials = [];
        var transformationMatrix = mat4.create();
        var aniMatrix = mat4.create();
        var children;
        var activeMaterial = new CGFappearance(this.scene);
        var actMat;
        var counter = 0;
        var coord = [];
        if (this.primitives[id] != null) {
            if(this.primitives[id] instanceof MyPlane || this.primitives[id] instanceof MyPatch || this.primitives[id] instanceof MyNurbsCylinder){
                this.primitives[id].display();
            }else{
                this.primitives[id].updateTexCoords(coord);
                this.primitives[id].display();
            }
        } else {

            ani = this.components[this.components.indexOf(id)+6];
         //   console.log(ani);



            transformationMatrix = this.components[this.components.indexOf(id) + 1];
            children = this.components[this.components.indexOf(id) + 5];

            if (this.components[this.components.indexOf(id) + 2] == "inherit") {
                materials = mats;
            } else {
                materials = this.components[this.components.indexOf(id) + 2];
            }

            if (this.components[this.components.indexOf(id) + 4] == "inherit") {
                texture = text;
            } else if (this.components[this.components.indexOf(id) + 4] == "none") {} else {
                texture = this.components[this.components.indexOf(id) + 4];

                coord.push(texture[1]);
                coord.push(texture[2]);


            }

            if (this.materialIncrement == true) {
                if (this.checkMaterialsSize(materials, this.components[this.components.indexOf(id) + 3])) {
                    this.components[this.components.indexOf(id) + 3]++;
                } else {
                    this.components[this.components.indexOf(id) + 3] = 0;
                }
            }

            var c = 0;
            for (var mat in materials) {
                if (c == this.components[this.components.indexOf(id) + 3]) {
                    activeMaterial = materials[mat];
                    break;
                }
                c++;
            }
            
            // this.scene.pushMatrix();
            // aniMatrix = mat4.create();
            // if (ani != undefined){
            //     ani.apply(aniMatrix);
            //     //this.scene.multMatrix(aniMatrix);
            //     this.scene.multMatrix(transformationMatrix);

            //     ani = undefined;
            
            // }
            // else
            //     this.scene.multMatrix(transformationMatrix);
            // this.scene.popMatrix();

            activeMaterial.setTexture(texture);

            activeMaterial.apply();
            for (var i = 0; i < children.length; i++) {
                this.scene.pushMatrix();

              // aniMatrix = mat4.create();
                if (ani != "a"){
                    aniMatrix = ani.apply();
                    mat4.multiply(aniMatrix, transformationMatrix, aniMatrix);
                    this.scene.multMatrix(aniMatrix);
                    
                   // this.scene.multMatrix(aniMatrix);
    
                    //ani = undefined;
                
                }
                else
                    this.scene.multMatrix(transformationMatrix);
                this.displayScene(this.reader.getString(children[i], 'id'), this.scene.transfMatrix, materials, texture, ani);
                this.scene.popMatrix();
            }
            
        }

    }
}