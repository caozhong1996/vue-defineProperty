let data = {
    num: 1,
    price: 2
}
let target = null
let total

class Dep {
    constructor () {
        this.subscriber = []
    }
    depend () {
        if (target && !this.subscriber.includes(target)) {
            this.subscriber.push(target)
        }
    }
    notify () {
        this.subscriber.forEach(sub => sub())
    } 
}

let dep = new Dep()
Object.keys(data).forEach(key => {
    let internalValue = data[key]
    Object.defineProperty(data, key, {
        get () {
            dep.depend()
            return internalValue
            console.log('I was accessted')
        },
        set (newVal) {
            internalValue = newVal
            // 此处应该先赋值再调用储存的函数，不然会造成无限循环，因为每次调用notify函数，都会去调用get
            dep.notify()
            console.log('I was updated')
        }
    })
})

function watcher (fun) {
    target = fun
    target()
    target = null
}

watcher(() => {
    total = data.num * data.price
})

console.log('total is ', total)

data.price = 3

console.log('total is ', total)