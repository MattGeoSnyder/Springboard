"""Word Finder: finds random words from a dictionary."""
from random import randint


class WordFinder:
    """
    Class to find words from a given path to a dictionary file

    >>> words = WordFinder("./words.txt")

    >>> words.num_of_words_read()

    >>> words.random()
    """

    def __init__(self, path):
        file = open(path, 'r')
        self.text = file.read().split('\n')
        file.close()
        print(f'{self.num_of_words_read()} words read')

    def num_of_words_read(self):
        return len(self.text)

    def random(self):
        return self.text[randint(0, self.num_of_words_read())]
