# How to fetch data in react?

## Bug report

In the beginning, I tried to fetch data from third party API like this:

```javascript
this.state = {
  // `generateJoke` is a async function, it uses fetch API to fetch raw data, transforms it to JavaScript object, finally return the field I need.
  joke: this.generateJoke(),
}
```

However it failed, `react-dom.development.js` throwed an Error:

```bash
Uncaught Error: Objects are not valid as a React child (found: [object Promise]). If you meant to render a collection of children, use an array instead.
```

I thought maybe we can't do async operations in `Constructor`.

## Searching for anwsers...

Search result tells me that <strong>We CAN'T use promises in a construcotr</strong>. Because a constructor must return the object to be constructed, not a promise. [Async/Await Class Constructor](https://stackoverflow.com/questions/43431550/async-await-class-constructor)

OK, that's fine, let me transform my thought, I want to fetch data and render it in my UI.

So my question came out: <strong>how to fetch data in react?</strong>

## Solution

I found [answers](https://www.geeksforgeeks.org/how-to-fetch-data-from-an-api-in-reactjs/).

I should fetch data in `componentDidMount` lifecycle hook.

I did and it works!

The code after changed:

```javascript
componentDidMount() {
    // fetch inital data here
    this.fetchNewJoke()
}

async fetchNewJoke() {
const joke = await this.generateJoke()
this.setState({
joke: joke,
})
}
```
