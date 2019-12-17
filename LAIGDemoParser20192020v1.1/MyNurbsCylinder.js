class MyNurbsCylinder extends CGFobject{
	constructor(scene, id, base, top, height, slices, stacks){
		super(scene);
		this.base = base;
		this.top = top;
		this.height = height;
		this.slices=slices;
		this.stacks=stacks;
		this.makeSurface();
	}


	makeSurface(){

		var controlVerticesTop=[
			[[0, -this.top, this.height, 1], [0, -this.base, 0, 1]],
			[[-this.top, -this.top, this.height, 1], [-this.base, -this.base, 0, 1]],
			[[-this.top, 0, this.height, 1], [-this.base, 0, 0, 1]],
			[[-this.top, this.top, this.height, 1], [-this.base, this.base, 0, 1]],
			[[0, this.top, this.height, 1], [0, this.base, 0, 1]],
			[[this.top, this.top, this.height, 1], [this.base, this.base, 0, 1]],
			[[this.top, 0, this.height, 1], [this.base, 0, 0, 1]],
			[[this.top, -this.top, this.height, 1], [this.base, -this.base, 0, 1]],
			[[0, -this.top, this.height, 1], [0, -this.base, 0, 1]]
		];

		this.surface = new CGFnurbsSurface(8, 1, controlVerticesTop);

		this.objTop = new CGFnurbsObject(this.scene, this.slices, this.stacks, this.surface);

		this.objTop.initBuffers();

	}

	display(){	
		this.objTop.display();
	}
}