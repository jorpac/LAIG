class MyPatch extends CGFobject{
	constructor(scene, id, nDivisionsU, nDivisionsV, degree1, degree2){
		super(scene);
		this.nDivisionsU=nDivisionsU;
		this.nDivisionsV=nDivisionsV;
		this.degree1=degree1;
		this.degree2=degree2;
		this.makeSurface();
	}


	makeSurface(){

		var controlVertices=[];

		if(this.degree1==1){
			switch(this.degree2){
				case 1:
				controlVertices=[
				[
				[ -5.0, 0.0, 5.0, 1 ],
				[-5.0,  0.0, -5.0, 1]
				],
				[
				[ 5.0, 0.0, 5.0, 1 ],
				[5.0,  0.0, -5.0, 1]
				]
				];
				break;

				case 2:
				controlVertices=[
				[
				[ -5.0, 0.0, 5.0,  1 ],
				[ -5.0,  5.0, 0.0,  1 ],
				[ -5.0,  0.0, -5.0, 1 ]
				],
				[
				[ 5.0, 0.0, 5.0,  1 ],
				[ 5.0,  5.0, 0.0,  1 ],
				[ 5.0,  0.0, -5.0, 1 ]
				]
				];
				break;

				case 3:
					controlVertices=[//U=0
									[//V=0-3
										[ -5.0, 0.0, 5.0,  1 ],
										[ -5.0,  5.0, -2.5,  1 ],
										[ -5.0,  -5.0, 2.5, 1 ],
										[ -5.0,  0.0, -5.0, 1 ]
										],
										[//V=0-3
										[ 5.0, 0.0, 5.0,  1 ],
										[ 5.0,  5.0, -2.5,  1 ],
										[ 5.0,  -5.0, 2.5, 1 ],
										[ 5.0,  0.0, -5.0, 1 ]	
										]
										];

				break;
			}

		}else if(this.degree1==2){
			switch(this.degree2){
					case 1:
						controlVertices=[
										[
										[ -5.0, 0.0, 5.0, 1 ],
										[ -5.0,  0.0, -5.0, 1 ]
										],
										[
										[ 0.0, 5.0, 5.0, 1 ],
										[ 0.0,  5.0, -5.0, 1 ]
										],
										[
										[ 5.0, 0.0, 5.0, 1 ],
										[ 5.0,  0.0, -5.0, 1 ]
										]
										];
						break;

					case 2:
						controlVertices=[
										[
										[ -5.0, 0.0, 5.0,  1 ],
										[ -5.0,  5.0, 0.0,  1 ],
										[ -5.0,  0.0, -5.0, 1 ]
										],
										[
										[ 0.0, 0.0, 5.0,  1 ],
										[ 0.0,  5.0, 0.0,  1 ],
										[ 0.0,  0.0, -5.0, 1 ]
										],
										[
										[ 5.0, 0.0, 5.0,  1 ],
										[ 5.0,  5.0, 0.0,  1 ],
										[ 5.0,  0.0, -5.0, 1 ]
										]
										];
										break;
					}
				}
				
				this.surface = new CGFnurbsSurface(this.degree1, this.degree2, controlVertices);

				this.obj = new CGFnurbsObject(this.scene, this.nDivisionsU, this.nDivisionsV, this.surface);

				this.obj.initBuffers();


	}

	display(){	
		this.obj.display();
	}
}