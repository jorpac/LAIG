#ifdef GL_ES
precision highp float;
#endif


uniform mat4 uMVMatrix;
uniform mat4 uPMatrix;
vec3 aVertexPosition;
attribute vec2 aTextureCoord;
varying vec2 vTextureCoord;


void main(){
    gl_Position = uPMatrix * uMVMatrix * vec4(aVertexPosition, 1.0);
    vTextureCoord = aTextureCoord;

}