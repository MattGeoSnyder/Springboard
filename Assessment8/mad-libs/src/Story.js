const Story = ({formData, story}) => {
    console.log(story)
    story.fields = {...formData}
    return (
        <div>
            <p>{story.getStory()}</p>
        </div>
    )
}

export default Story;