const StorySelect = ({stories}) => {
    return (
        <select>
            {stories.map((story, idx) => (
                <option key={idx} value={idx}>
                    {story.name}
                </option>
            ))}
        </select>
    )
}

export default StorySelect;