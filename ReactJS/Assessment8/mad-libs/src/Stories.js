const stories = [
    {
        name: 'Sitting Story',
        fields: {
            noun1: '',
            noun2: '',
            adjective: '',
            color: '' },
        getStory() {
            return`The ${this.fields.noun1} sat on the ${this.fields.color} ${this.fields.adjective} ${this.fields.noun2}`
        }
    },
    {   
        name: 'Love Story',
        fields: {
            noun1: '',
            noun2: '',
            adjective: '',
            color: '' },
        getStory() {
            return `There was a ${this.fields.color} ${this.fields.noun1} who loved a ${this.fields.adjective} ${this.fields.noun2}`
        }
    }
]

export default stories;