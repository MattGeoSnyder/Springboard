def flip_case(phrase, to_swap):
    """Flip [to_swap] case each time it appears in phrase.

        >>> flip_case('Aaaahhh', 'a')
        'aAAAhhh'

        >>> flip_case('Aaaahhh', 'A')
        'aAAAhhh'

        >>> flip_case('Aaaahhh', 'h')
        'AaaaHHH'

    """
    ret = []
    buffer = ""
    for char in phrase:
        if char.lower() == to_swap.lower() and char.islower():
            buffer = char.upper()
        elif char.lower() == to_swap.lower() and char.isupper():
            buffer = char.lower()
        else:
            buffer = char
        ret.append(buffer)
    return "".join(ret)


print(flip_case('Aaaahhh', 'a'))
print(flip_case('Aaaahhh', 'A'))
print(flip_case('Aaaahhh', 'h'))
