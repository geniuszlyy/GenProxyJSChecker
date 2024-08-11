# EN
A tool for checking the availability of HTTP, HTTPS, SOCKS4, and SOCKS5 proxies.

## Features
- **Support for multiple proxy types**: HTTP, HTTPS, SOCKS4, and SOCKS5.
- **Customizable input and output files**: Specify the proxy list and output results file.
- **Error handling and logging**: Clear and informative logging of proxy statuses and errors.
- **User-friendly**: Easy to use with simple command-line arguments.

## Installation
To use this tool, you need Node.js installed on your machine. If Node.js is not installed, download and install it from the official website.

1. Clone the repository:
```bash
git clone https://github.com/geniuszlyy/GenProxyJSChecker.git
```
2. Navigate to the project directory:
```bash
cd GenProxyJSChecker
```
3. Install the required dependencies:
```bash
npm install
```

## Usage
To run the proxy checker, use the following command:
```bash
node GenProxyJSChecker.js [proxy_type] [proxy_file]
```
- `proxy_type`: The type of proxies you want to check (`http`, `https`, `socks4`, `socks5`).
- `proxy_file`: The file containing the list of proxies to check.

![image](https://github.com/user-attachments/assets/ece65016-92b9-4218-8d5f-b486014ef1fc)


## Example
```bash
node GenProxyJSChecker.js socks5 socks5_proxies.txt
```
This command will check the availability of SOCKS5 proxies listed in the `socks5_proxies.txt` file and output the results to `socks5_work.txt`.

## Output
The results will be saved in a file named `<proxy_type>_work.txt`, where `<proxy_type>` is the type of proxies checked. The output format will indicate whether the proxy is working or not and any encountered errors.

## Output Example
```less
[+] рабочий - 127.0.0.1:80
[?] ошибка - tunneling socket could not be established, cause=connect ETIMEDOUT 177.207.208.35:8080
[-] не работает - 177.207.208.35:8080
```

![image](https://github.com/user-attachments/assets/1f6987b0-9f05-427e-afef-46efb043e1b2)


# RU
Инструмент для проверки доступности прокси-серверов типов HTTP, HTTPS, SOCKS4 и SOCKS5.

## Особенности
- **Поддержка различных типов прокси**: HTTP, HTTPS, SOCKS4 и SOCKS5.
- **Настраиваемые входные и выходные файлы**: Укажите файл списка прокси и файл для сохранения результатов.
- **Обработка ошибок и логирование**: Ясное и информативное логирование состояния прокси и ошибок.
- **Удобство использования**: Простой и понятный интерфейс командной строки.

## Установка
Для использования этого инструмента необходим установленный Node.js. Если Node.js не установлен, загрузите и установите его с официального сайта.

1. Cклонируйте репозиторий:
```bash
git clone https://github.com/geniuszlyy/GenProxyJSChecker.git
```
2. Перейдите в директорию проекта:
```bash
cd GenProxyJSChecker
```
3. Установите необходимые зависимости:
```bash
npm install
```

## Использование
Для запуска проверки прокси используйте следующую команду:
```bash
node GenProxyJSChecker.js [тип_прокси] [файл_с_прокси]
```
- `тип_прокси`: Тип проверяемых прокси (`http`, `https`, `socks4`, `socks5`).
- `файл_с_прокси`: Файл, содержащий список прокси для проверки.

![image](https://github.com/user-attachments/assets/71b36802-500b-4c2a-ada4-ad2b4c2980e7)


## Пример
```bash
node GenProxyJSChecker.js socks5 socks5_proxies.txt
```
Эта команда проверит доступность прокси SOCKS5, указанных в файле `socks5_proxies.txt`, и сохранит результаты в `socks5_work.txt`.

## Вывод
Результаты будут сохранены в файле с именем `<тип_прокси>_work.txt`, где `<тип_прокси>` — это тип проверенных прокси. Формат вывода укажет, работает ли прокси и какие ошибки были обнаружены.

## Пример вывода
```less
[+] рабочий - 127.0.0.1:80
[?] ошибка - tunneling socket could not be established, cause=connect ETIMEDOUT 177.207.208.35:8080
[-] не работает - 177.207.208.35:8080
```

![image](https://github.com/user-attachments/assets/546e6a2b-e58e-4707-b2cd-e3c65d874ea0)
