function wait(time) {
  const deffer = new Promise((resolve) => {
    setTimeout(() => {
      console.log(`Waited for ${time}ms`)
      resolve(null)
    }, time)
  })
  return deffer
}

async function asyncFunc() {
  console.log('2')
  await wait(2000)
  console.log('4')
}

function promiseFunc() {
  console.log('6')
  const deffer = wait(2000).then(() => {
    console.log('8')
  })
  console.log('7')
  return deffer
}

async function main() {
  console.log('1')
  await asyncFunc().then(() => {
    throw new Error();
  })
  await promiseFunc()
  console.log('9')
}

/* Main with promise instead of async.  */
// function main() {
//   console.log('1')
//   asyncFunc().then(() => {
//     console.log('5')
//     promiseFunc().then(() => {
//       console.log('9')
//     })
//   })
// }

console.log('0')
main().catch(() => {
  console.log('5')
})
console.log('3')












/* main thread

  0
  main()
    1
    asyncFunc()
      2
      wait() start thread 1
    asyncFunc() destroy
  main() destroy
  3

  thread 1 joins main thread
  0
  main()
    1
    asyncFunc()
      wait() has finished 2 seconds work.
      4
  main()
    5
    promiseFunc()
      6
      7
      wait() start thread 2

  thread 2 joins main thread

  main()
    5
    promiseFunc()
      6
      7
      wait() start thread 2
      8
    main()
      9
*/

/* thread 1
  setTimeout(() => 'some work', time);
*/

/* thread 2
  setTimeout(() => 'same work', time);
*/