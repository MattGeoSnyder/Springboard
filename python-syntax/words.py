def print_upper_words(words, beginning={"h", "y"}):
    for word in words:
        if word[0] in beginning:
            print(word.upper())


print_upper_words(['hello', 'hey', 'goodbye', 'yo', 'yes'])
