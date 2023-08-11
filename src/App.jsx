import React from 'react'
import './App.css'
import ReactMarkdown from 'react-markdown'
import remarkGfm from "remark-gfm";
import { FaExpandArrowsAlt } from "react-icons/fa";
import { ImShrink2 } from "react-icons/im";

const markdownText = `
# Welcome to my React Markdown Previewer!

## This is a sub-heading...
### And here's some other cool stuff:

Heres some code, \`<div></div>\`, between 2 backticks.

\`\`\`
// this is multi-line code:

function anotherExample(firstLine, lastLine) {
  if (firstLine == 'abc' && lastLine == 'def') {
    return multiLineCode;
  }
}
\`\`\`

You can also make text **bold**... whoa!
Or _italic_.
Or... wait for it... **_both!_**
And feel free to go crazy ~~crossing stuff out~~.

There's also [links](https://www.freecodecamp.org), and
> Block Quotes!

And if you want to get really crazy, even tables:

Wild Header | Crazy Header | Another Header?
------------ | ------------- | -------------
Your content can | be here, and it | can be here....
And here. | Okay. | I think we get it.

- And of course there are lists.
  - Some are bulleted.
     - With different indentation levels.
        - That look like this.


1. And there are numbered lists too.
1. Use just 1s if you want!
1. And last but not least, let's not forget embedded images:

![BocaJuniors Logo](https://upload.wikimedia.org/wikipedia/commons/thumb/4/41/CABJ70.png/200px-CABJ70.png)
`

export default class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      markdown: markdownText,
      editor: "",
      previewer: "",
      screenSize: ""
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleClickEditor = this.handleClickEditor.bind(this)
    this.handleClickPreviewer = this.handleClickPreviewer.bind(this)
  }

  handleChange(event) {
    this.setState({
      markdown: event.target.value,
    })
  }

  handleClickEditor() {
    this.state.previewer === "" ?
    this.setState({
      previewer: "noDisplay",
      screenSize: 'on'
    }) :
    this.setState({
      previewer: "",
      screenSize: ""
    })
  }

  handleClickPreviewer() {
    this.state.editor === "" ?
    this.setState({
      editor: "noDisplay",
      screenSize: 'on'
    }) :
    this.setState({
      editor: "",
      screenSize: ""
    })
  }

  render() {
    return (
      <div className='container'>
        <div className={this.state.editor}>
          <div className='section'>
            <p>Editor</p>
            <span>
              {
                this.state.previewer === "" ?
                <FaExpandArrowsAlt onClick={this.handleClickEditor}/> :
                <ImShrink2 onClick={this.handleClickEditor}/>
              }
            </span>
          </div>
          <textarea className={`editorFirstSizes ${this.state.screenSize}`} name="editor" id="editor" value={this.state.markdown} onChange={this.handleChange} >{markdownText}</textarea>
        </div>
        <div className={this.state.previewer}>
          <div className="section">
            <p>Previewer</p>
            <span>
              {
                this.state.editor === "" ?
                <FaExpandArrowsAlt onClick={this.handleClickPreviewer}/> :
                <ImShrink2 onClick={this.handleClickPreviewer}/>
              }
            </span>
          </div>
          <div id="preview" className={`previewFirstSizes ${this.state.screenSize}`}>
            <ReactMarkdown
            remarkPlugins={[remarkGfm]}>
              {this.state.markdown}
            </ReactMarkdown>
          </div>
        </div>
      </div>
    )
  }
}
