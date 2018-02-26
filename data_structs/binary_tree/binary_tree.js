class BinaryNode {
  constructor(data) {
    this.data = data
    this.parent = null
    this.left = null
    this.right = null
  }

  hasChildren() { return this.left !== null || this.right !== null }
  level() { return this.parent !== null ? this.parent.level() + 1 : 0 }
}

class BinaryTree {
  static addBinNode(node, newNode, cmpFn) {
    if (!node) throw new Error(`Invalid argument ${node}`)
    if (!newNode) throw new Error(`Invalid argument ${newNode}`)

    let currNode = node
    let value = newNode.data
    while (true) {
      if (cmpFn(value, currNode.data) < 0) {
        if (currNode.left === null) {
          currNode.left = new BinaryNode(value)
          currNode.left.parent = currNode
          break
        } else {
          currNode = currNode.left
        }
      } else {
        if (currNode.right === null) {
          currNode.right = new BinaryNode(value)
          currNode.right.parent = currNode
          break
        } else {
          currNode = currNode.right
        }
      }
    }

    return node
  }

  static removeBinNode(node, value, cmpFn) {
    let n = BinaryTree.findBinNode(node, value, cmpFn)
    if (!n) throw new Error(`No node with value=${value}`)

    let p = n.parent
    if (!n.left && !n.right) { // Simple leaf case :
      if (!p) return null

      if (p.left === n) p.left = null
      else if (p.right === n) p.right = null
      else throw new Error('Internal Error')
    } else if (n.left && !n.right) { // No right side :
      let newNode = n.left
      newNode.parent = p
      if (!p) return newNode

      if (p.left === n) p.left = newNode
      else if (p.right === n) p.right = newNode
      else throw new Error('Internal Error')
    } else { // There is rights side, or both left and right side.
      let newNode = BinaryTree.findMinBinNode(n.right)

      // Cut out the newNode, and transfer right side if needed :
      if (newNode.parent && newNode.parent.left === newNode) {
        if (newNode.right) {
          newNode.parent.left = newNode.right
          newNode.right.parent = newNode.parent
        } else {
          newNode.parent.left = null
        }
      }

      // Set new values for right and left, and set correct parents :
      if(n.right && n.right !== newNode) { // n.right === newNode is a special, that should be ignored.
        newNode.right = n.right
        n.right.parent = newNode
      }
      if(n.left && n.left !== newNode) { // n.left === newNode is a special, that should be ignored.
        newNode.left = n.left
        n.left.parent = newNode
      }

      if (!p) {
        // Make newNode root if parent doesn't exist  :
        node = newNode
        newNode.parent = null
      } else {
        // Set parent left or right to newNode :
        if (p.left === n) p.left = newNode
        else if (p.right === n) p.right = newNode
        else throw new Error('Internal Error')
        newNode.parent = p
      }
    }

    return node
  }

  static findBinNode(node, value, cmpFn) {
    let diff, currNode = node
    while (currNode) {
      diff = cmpFn(value, currNode.data)
      if (diff === 0) return currNode
      else if (diff < 0) currNode = currNode.left
      else if (diff > 0) currNode = currNode.right
    }

    return currNode
  }

  static traverseBinNode(node, callback) {
    let currNode = node
    let stack = []

    while (currNode) {
      stack.push(currNode)
      currNode = currNode.left
    }

    while (stack.length > 0) {
      currNode = stack.pop()
      callback(currNode)

      if (currNode.right) {
        currNode = currNode.right

        while (currNode) {
          stack.push(currNode)
          currNode = currNode.left
        }
      }
    }
  }

  static findMinBinNode(node) {
    if (!node) return null
    while (node.left) {
      node = node.left
    }

    return node
  }

  static findMaxBinNode(node) {
    if (!node) return null
    while (node.right) {
      node = node.right
    }

    return node
  }

  /**
   * Creates an instance of BinaryTree.
   * Takes a standard compare function.
   *
   * @param { function(any, any):number } cmpFn
   * @memberof BinaryTree
   */
  constructor(cmpFn) {
    if (!(cmpFn instanceof Function))
      throw new Error('Invalid argument cmpFn must be a Function')
    this.root = null
    this.cmpFn = cmpFn
  }

  add(value) {
    if (this.root === null) this.root = new BinaryNode(value)
    else BinaryTree.addBinNode(this.root, new BinaryNode(value), this.cmpFn)
  }

  remove(value) {
    this.root = BinaryTree.removeBinNode(this.root, value, this.cmpFn)
  }

  findNode(value) {
    let n = BinaryTree.findBinNode(this.root, value, this.cmpFn)
    return n
  }

  contains(value) {
    let n = this.findNode(value)
    return typeof n !== typeof undefined && n !== null
  }

  traverse(callback) {
    BinaryTree.traverseBinNode(this.root, callback)
  }
}

/* Random Test :
let cmp = (x, y) => x - y
let buffer = []
let cb = (x) => buffer.push(x.data)
let rnd = (min, max) => Math.floor(max * Math.random()) + min
let t = new BinaryTree(cmp)

while (true) {
  for (let i = 0; i < 100000; i++) {
    let n = rnd(i, -i + 1)
    t.add(n)
  }

  buffer = []
  t.traverse(cb)
  for (let i = 0; i < buffer.length; i++) {
    t.remove(buffer[i])
  }

  if (t.root !== null) throw new Error()
  console.log(new Date().toTimeString())
}
*/