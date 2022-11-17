"""Word Finder: finds random words from a dictionary."""
from random import randint

class WordFinder:
    """
    Class to find words from a given path to a dictionary file

    words = WordFinder(path="./words.txt")

    >>> words.num_of_words_read()
    100000

    >>> words.random()
    Some word in words
    """

    def __int__(self, path):
        file = open(path, 'r')
        self.words = read(file)
        self.num_of_words = num_of_words_read()
        print(f'{num_of_words_read}' words read)

    def num_of_words_read(self):
        return len(self.words)

    def random(self):
        return self.words[randint(0,len(self.num_of_words))]


        
        

