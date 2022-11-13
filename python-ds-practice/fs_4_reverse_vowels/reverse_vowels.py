def reverse_vowels(s):
    """Reverse vowels in a string.

    Characters which re not vowels do not change position in string, but all
    vowels (y is not a vowel), should reverse their order.

    >>> reverse_vowels("Hello!")
    'Holle!'

    >>> reverse_vowels("Tomatoes")
    'Temotaos'

    >>> reverse_vowels("Reverse Vowels In A String")
    'RivArsI Vewols en e Streng'

    reverse_vowels("aeiou")
    'uoiea'

    reverse_vowels("why try, shy fly?")
    'why try, shy fly?''
    """
    vowels = {'a', 'e', 'i', 'o', 'u'}
    vowel_pos = {}
    for i in range(len(s)):
        if s[i].lower() in vowels:
            vowel_pos[i] = s[i]

    keys = list(vowel_pos.keys())
    ret = []
    for char in s:
        if char.lower() in vowels:
            ret.append(vowel_pos[keys.pop()])
        else:
            ret.append(char)

    return "".join(ret)


print(reverse_vowels("Hello!"))
print(reverse_vowels("Tomatoes"))
print(reverse_vowels("Reverse Vowels In A String"))
print(reverse_vowels("aeiou"))
print(reverse_vowels("why try, shy fly?"))
