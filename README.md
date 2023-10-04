# Case Lab Tasks
Домашние задания для Case Lab.

## Проект "Цензор"
Создайте функцию censor, которая не принимает аргументов. Функция должна возвращать новую функцию, принимающую опционально 1 или 2 параметра (оба - строки).

1) Когда возвращаемая функция принимает 2 параметра, то она ничего не возвращает, а сохраняет полученные знания как пару (пара - это массив с 2мя значениями).

2) Когда возвращаемая функция принимает 1 параметр, то она возвращает полученную строку, заменив в ней все слова, согласно ранее сохранённым парам.

Пример использования:

const changeScene = censor();

changeScene('PHP','JS');

changeScene('backend', 'frontend')

console.log(changeScene('PHP is the most popular programming language for backend web-development'));
