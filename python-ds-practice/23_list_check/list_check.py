def list_check(lst):
    """Are all items in lst a list?

        >>> list_check([[1], [2, 3]])
        True

        >>> list_check([[1], "nope"])
        False
    """
    cond = True
    for item in lst:
        cond = cond and isinstance(item, list)

    return cond
