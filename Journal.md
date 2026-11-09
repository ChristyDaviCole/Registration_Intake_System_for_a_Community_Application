Journal Prompt 1: What did you accomplish in this phase? What is the practical difference between a regular expression with start/end anchors (^...$) and one without them when checking the length of a username?

I created 2 validation functions using regular expressions and the .test method. The practical difference between regular with start/end anchors and one without them when checking the length of a username is that anchors force the username to meet length requirements but the pattern without them can match some of a longer username.

Journal Prompt 2: What did you accomplish in this phase? Why is the case-insensitive flag i cleaner than converting strings with .toLowerCase() or writing alternate variations in an if statement?

Created 2 more validation functions using regular expressions. Case-insensitive flag i is cleaner becuase it ignores the difference between upper & lowercase letters without having to convert the input to either upper or lower before testing.

Journal Prompt 3: What did you accomplish in this phase? What is the conceptual difference between testing a string with .test() and extracting/reformatting data using capturing groups and backreferences?

In this phase, I created the formatPhoneNumber() function to put valid numbers into all the same format. The .test() method checks if a string matches a pattern as a true or false test. Capturing groups/backreferences allow us to rearrange certain parts of a string into a different format. 

Journal Prompt 4: How did you design your processRegistration() function? Looking back across Phases 1 through 4, how did building and verifying individual regular expressions first make assembling the final pipeline easier?



Journal Prompt 5: What bugs or unexpected results did you identify while running the full test suite? If you consulted an AI tutor for review, what advice did it provide, and what did you learn about regular expressions from this exercise?