class MyNurbsCylinder extends CGFobject{
	constructor(scene, id, slices, stacks){
		super(scene);
		this.slices=slices;
		this.stacks=stacks;
		this.makeSurface();
	}


	makeSurface(){

		var controlVerticesTop=[
		[
			[ -5.0, 0.0, 5.0,  1 ],
			[ -5.0,  5.0, 5.0,  1 ],
			[ -5.0,  5.0, -5.0,  1 ],
			[ -5.0,  0.0, -5.0, 1 ]
		],
		[
			[ 5.0, 0.0, 5.0,  1 ],
			[ 5.0,  5.0, 5.0,  1 ],
			[ 5.0,  5.0, -5.0,  1 ],
			[ 5.0,  0.0, -5.0, 1 ]
			]
		];

		var controlVerticesBot=[
		[
			[ -5.0, 0.0, -5.0,  1 ],
			[ -5.0,  -5.0*(2/3), -5.0,  1 ],
			[ -5.0,  -5.0*(2/3), 5.0,  1 ],
			[ -5.0,  0.0, 5.0, 1 ]
		],
		[
			[ 5.0, 0.0, -5.0,  1 ],
			[ 5.0,  -5.0*(2/3), -5.0,  1 ],
			[ 5.0,  -5.0*(2/3), 5.0,  1 ],
			[ 5.0,  0.0, 5.0, 1 ]
			]
		];

		this.surfaceTop = new CGFnurbsSurface(1, 3, controlVerticesTop);
		this.surfaceBot = new CGFnurbsSurface(1, 3, controlVerticesBot);

		this.objTop = new CGFnurbsObject(this.scene, this.slices, this.stacks, this.surfaceTop);
		this.objBot = new CGFnurbsObject(this.scene, this.slices, this.stacks, this.surfaceBot);

		this.objTop.initBuffers();
		this.objBot.initBuffers();

	}

	display(){	
		this.objTop.display();
		this.objBot.display();
	}
}