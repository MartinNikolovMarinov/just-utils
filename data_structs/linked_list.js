class LinkedListNode {
  constructor(data, next) {
    this.data = data
    this.next = next
  }
}


class LinkedList {
  constructor() {
    this.head = null
    this.length = 0
  }

  append(data) {
    if (this.head === null) {
      this.head = new LinkedListNode(data, null)
    } else {
      let tailNode = this.head
      while (tailNode.next) {
        tailNode = tailNode.next
      }

      let newNode = new LinkedListNode(data, null)
      tailNode.next = newNode
    }

    this.length++
    return this
  }

  prepend(data) {
    let newHead = new LinkedListNode(data, this.head)
    this.head = newHead
    this.length++
    return this
  }

  get(index) {
    if (0 > index || index >= this.length)
      throw new Error(`Index out of range. index=${index}`)

    let currNode = this.head
    for (let i = 0; i < index; i++) {
      currNode = currNode.next
    }

    return currNode.data
  }

  find(data) {
    let f = this.findNode(data)
    return f ? f.data : null
  }

  findNode(data) {
    let currNode = this.head
    for (let i = 0; i < this.length; i++) {
      if (currNode.data === data) return currNode
      else currNode = currNode.next
    }

    return null
  }

  remove(data) {
    // less than 2 elements cases:
    if (this.length <= 2) {
      if (this.length === 1 && this.head.data === data) {
        this.head = null
        this.length--
        return true
      }

      if (this.length === 2) {
        if (this.head.data === data) {
          this.head = this.head.next
          this.length--
          return true
        }

        if (this.head.next.data === data) {
          this.head = new LinkedListNode(this.head.data, null)
          this.length--
          return true
        }
      }

      return false
    }

    let curNode = this.head
    let prev = this.head

    // front boarder case:
    if (curNode.data === data) {
      this.head = this.head.next
      this.length--
      return true
    }

    // middle case:
    curNode = curNode.next
    while (curNode.next) {
      if (curNode.data === data) {
        prev.next = curNode.next
        this.length--
        return true
      }

      prev = prev.next
      curNode = curNode.next
    }

    // end boarder case:
    if (curNode.data === data) {
      prev.next = null
      this.length--
      return true
    }

    return false
  }

  toArray() {
    let curNode = this.head
    let ret = []

    for (let i = 0; i < this.length; i++) {
      ret.push(curNode.data)
      curNode = curNode.next
    }

    return ret
  }
}