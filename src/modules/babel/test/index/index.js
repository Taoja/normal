import './index.scss'
const page = {
  data () {
    return {
      global: Global
    }
  },
  methods: {
    /**
     * Default + Rest + Spread
     */
    test1() {
      function a(x, ...y) {
        // y is an Array
        return x * y.length
      }
      console.log(a(3, "hello", true))

      function b(x, y=12) {
        // y is 12 if not passed (or passed as undefined)
        return x + y
      }
      console.log(b(3))

      function c(x, y, z) {
        return x + y + z
      }
      // Pass each elem of array as argument
      console.log(c(...[1,2,3]))
    },
    /**
     * test Destructuring
     */
    test2() {
      // list matching
      var [a, ,b] = [1,2,3]
      console.log(a, b)

      // object matching
      var { op: a, lhs: { op: b }, rhs: c }
            = function(){return{
              op: 1,
              lhs: {
                op: 2
              },
              rhs: 3
            }}()
      console.log(a, b, c)
      // object matching shorthand
      // binds `op`, `lhs` and `rhs` in scope
      var {op, lhs, rhs} = (() => {
        return {op: 1, lhs: 2, rhs: 3}
      })()
      console.log(op, lhs, rhs)
      // Can be used in parameter position
      function g({name: x}) {
        console.log(x)
      }
      g({name: 5})

      // Fail-soft destructuring
      var [a] = []
      console.log(a)

      // Fail-soft destructuring with defaults
      var [a = 1] = []
      console.log(a)

      // Destructuring + defaults arguments
      function r({x, y, w = 10, h = 10}) {
        return x + y + w + h
      }
      r({x:1, y:2}) === 23
    },
    /**
     * test Arrows and Lexical This
     */
    test3() {
      var fives = []
      // Expression bodies
      var odds = [1,2,3].map(v => v + 1)
      var nums = [1,2,3].map((v, i) => v + i)

      // Statement bodies
      nums.forEach(v => {
        if (v % 5 === 0)
          fives.push(v)
      })

      // Lexical this
      var bob = {
        _name: "Bob",
        _friends: [],
        printFriends() {
          this._friends.forEach(f =>
            console.log(this._name + " knows " + f))
        }
      }

      // Lexical arguments
      function square() {
        let example = () => {
          let numbers = []
          for (let number of arguments) {
            numbers.push(number * number)
          }

          return numbers
        }

        return example()
      }

      console.log(square(2, 4, 7.5, 8, 11.5, 21))
    },
    /**
     * test Template Strings
     */
    test4() {
      // Basic literal string creation
      `This is a pretty little template string.`

      // Multiline strings
      `In ES5 this is
      not legal.`

      // Interpolate variable bindings
      var name = "Bob", time = "today";
      `Hello ${name}, how are you ${time}?`

      // Unescaped template strings
      String.raw`In ES5 "\n" is a line-feed.`
    },
    /**
     * test Generators
     */
    async test5() {
      var fibonacci = {
        [Symbol.iterator]: function*() {
          var pre = 0, cur = 1;
          for (;;) {
            var temp = pre;
            pre = cur;
            cur += temp;
            yield cur;
          }
        }
      }
      
      for (var n of fibonacci) {
        // truncate the sequence at 1000
        if (n > 1000)
          break;
        console.log(n);
      }
      await Promise.resolve(1)
    }
  },
  mounted() {
    window.test = [this.test1, this.test2, this.test3, this.test4, this.test5]
  },
  render(h) {
    return (
      <div class="app">
        <div class="logo">
          <img src={require('@a/turbo.png')} alt=""/>
        </div>
        <h3>WELCOME TO YOUR TURBO APP</h3>
        {
          Object.keys(this.global).map((name) => 
            <div>
              <h4>{name}</h4>
              <ul>
                {
                  Object.keys(this.global[name]).map((key) => 
                    <li><a href={this.global[name][key]}>{key}</a></li>
                  )
                }
              </ul>
            </div>
          )
        }
      </div>
    )
  },
}

import init from '@/'
init(page)