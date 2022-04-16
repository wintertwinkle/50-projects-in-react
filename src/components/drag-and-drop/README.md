# Drag and Drop

## 问题 1： How to move items between two components in react?

一开始我的思路跟原生开发一样，想着要怎么直接在两个组件之间移动子组件。

但是在 React 中有一个 `immutability` 思想，就是每次重新渲染时的组件都是一个全新的组件，也就是说在 React 中两次渲染之间组件是不变的，可以看出视频中的一帧。

遵循这个思想，在 React 中，要在两个组件之间移动子组件，比如：

```
<ParentA><child /></ParentA> ---> <ParentB><child /></ParentB>
```

那么第一帧的状态是`<ParentA><child /></ParentA>`, 第二帧的状态是`<ParentB><child /></ParentB>`。

从第一帧到第二帧的转变，我不需要考虑 React 是怎么实现组件移动的，只要直接声明子组件`<child />`在第二帧里是`<ParentB>`的孩子就 OK 了。

由这一点继续深入思考：React 只是一个 UI 库，提供一种声明式语法来`画UI`。我们只是告诉 React 界面应该长什么样以及在状态改变后，这个界面应该发生哪些改变。而具体怎样操作具体的 DOM 是由 ReactDOM 来实现的。

**React vs Vue**

由 React 的 `immutability` 思想出发与 Vue 进行对比，可以发现一个很有趣的点：Vue 是通过劫持数据来达到发现状态变动的。而 React 是比较新旧数据之间的差异来发现状态变动的。

## 注意事项 1：

如果要移动元素就要调用接收元素的容器的 `onDrop` 事件：

```jsx
const dragDrop = (e) => {
  // do something
}
```

但在此之前，一定要先取消 `onDragOver` 的默认行为，不然`onDrop` 事件的处理函数是不会触发的

```jsx
const dragOver = (e) => {
  e.preventDefault()
}
```
