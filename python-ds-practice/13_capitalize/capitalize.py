def capitalize(phrase):
    """Capitalize first letter of first word of phrase.

        >>> capitalize('python')
        'Python'

        >>> capitalize('only first word')
        'Only first word'
    """
    ret = phrase.split(" ")
    ret[0] = ret[0].title()
    return " ".join(ret)
