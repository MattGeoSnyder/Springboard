const Tweet = ({name, date, msg}) => {
    return <div><b>@{name}</b>
        <small>{date}</small>
        <p>{msg}</p></div>
}

const App = () => {
    return <div>
        <Tweet name="Matt" date="04/20/2023" msg="Hello World!"></Tweet>
        <Tweet name="Matt" date="04/20/2023" msg="I am a real human"></Tweet>
        <Tweet name="Matt" date="04/20/2023" msg="Or am I?"></Tweet>
    </div>
}

ReactDOM.render(<App />, document.querySelector('#root'));
