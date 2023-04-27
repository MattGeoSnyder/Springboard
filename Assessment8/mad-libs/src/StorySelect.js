const StorySelect = ({stories, handleChange}) => {
    return (
        <select 
            name='storyIdx'
            onChange={handleChange}
        >
            {stories.map((story, idx) => (
                <option key={idx} value={idx}>
                    {story.name}
                </option>
            ))}
        </select>
    )
}

export default StorySelect;