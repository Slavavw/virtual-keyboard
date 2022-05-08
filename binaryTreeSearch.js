class Node{
    constructor(value , row, col){
      this.value = value;      
      this.left = null;
      this.right = null;
    }
  }
  
//export default  
class BinarySearchTree {
    constructor(){
      this.root = null;
    };
    add( value ){
      this.root = addWithin( this.root,value);
      function addWithin(node,value){
        if( !node) return new Node(value);
        if ( value < node.value ){
          node.left = addWithin(node.left,value);
        }
        else if ( value > node.value) {
          node.right = addWithin(node.right,value);
        }
          return node;       
      }
    };
     root() { return this.root};
     
     has(data){
       let current = this.root;
       return hasValue(current,data);
       function hasValue(node, value) {
         if (!node) return false;
         if ( node.value> value ){
           return hasValue(node.left,value );
         }
         else if (node.value<value ){
           return hasValue(node.right,value);
         }
         else return true;        
       }      
     }
  
     find(data){      
       return findElement(this.root,data);
       function findElement(node, value){
         if (!node) return null;
         if (value<node.value){
           return findElement(node.left,value);          
         }
         else if (value>node.value){
           return findElement(node.right,value)
         }
         else return node;
       }
     }
      get toString(){
        let level = 0;
        print(this.root,'heder');
        function print(node, type = 'left') {
         if ( !node) return; 
         console.log( 'level '+type+' is:---',level++,'-----value-----',node.value);         
          print(node.left); print(node.right,'right'); level--;
        }
      }
      remove(data){
        let deleteNode = null;
        this.root = removeData(this.root,data);
        function removeData(node,value){         
          if (!node) return null;
          if (value<node.value ){
           node.left= removeData(node.left,value);
           return node;
          }
          else if (value>node.value){
           node.right = removeData(node.right,value);
           return node;
          }
          else{
             deleteNode = node;
              //equal 
              if (!node.left && !node.right ) {deleteNode = node; return null;}
              if ( !node.left ) return node.right; 
              else if (!node.right) return node.left;
              else {
                  let minFromRoot = node.right;
                  while (minFromRoot.left){
                      minFromRoot = minFromRoot.left;
                  }
                  minFromRoot.left = deleteNode.left; 
                  minFromRoot.right = deleteNode.right;
                  return minFromRoot;
                }
          }
        }
        return deleteNode;
      }
      isEmpty(){ return (!this.root?true:false)}
  
      min(){
          if (this.isEmpty()) return null;
          let minResult = this.root.value;
          findMinimum( this.root);
          function findMinimum( node){
            if (!node) return;
            if( minResult>node.value) minResult = node.value;
            findMinimum(node.left); findMinimum(node.right);
          }
          return minResult;
      }
  
      max(){
        if (this.isEmpty()) return null;
        let maxResult = this.root.value;
        findMinimum( this.root);
        function findMinimum( node){
          if (!node) return;
          if( maxResult<node.value) maxResult = node.value;
          findMinimum(node.left); findMinimum(node.right);
        }
        return maxResult;
    }
  }
  
  