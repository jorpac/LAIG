class MyPlane extends CGFobject{
	constructor(scene, id, nDivisionsU, nDivisionsV, degree1, degree2){
		super(scene);
		this.nDivisionsU=nDivisionsU;
		this.nDivisionsV=nDivisionsV;
		this.degree1=degree1;
		this.degree2=degree2;
		this.makeSurface(this.degree1, this.degree2);
	}


	makeSurface(degree1, degree2){
    	var controlVertices=[// U = 0
								[ // V = 0..1;
									[-1.0,  0.0, -1.0, 1 ],
									[-1.0, 0.0, 1.0, 1 ]
									
								],
							// U = 1
								[ // V = 0..1
									[ 1.0,  0.0, -1.0, 1 ],							 
									[ 1.0, 0.0, 1.0, 1 ]
								]
							]

		this.surface = new CGFnurbsSurface(degree1, degree2, controlVertices);

		this.obj = new CGFnurbsObject(this.scene, this.nDivisionsU, this.nDivisionsV, this.surface);

		this.obj.initBuffers();

	}

	display(){
		this.obj.display();
	}
}