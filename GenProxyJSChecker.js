const fs = require('fs');
const request = require("request");
const path = require('path');
const chalk = require('chalk');

// Логотип и инструкция по использованию
console.log(chalk.yellow(`
    ╭────────────────────────────────━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━────────────────────────────╮
    |            Программа для проверки HTTP, HTTPS, SOCKS4, SOCKS5 прокси-серверов             |
    ╰────────────────────────────────━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━────────────────────────────╯
    ╭──────────────────────────────────────━━━━━━━━━━━━━━━━━━━━━━━━━━━──────────────────────────────────╮
    |            Использование: node ${path.basename(__filename)} [тип_прокси] [файл_с_прокси]                               |
    |            Пример: node ${path.basename(__filename)} socks5 socks5.txt                                                 |
    |            Поддерживаемые типы прокси: http, https, socks4, socks5                                |
    |            Описание: Данный инструмент проверяет прокси на работоспособность.                     |
    ╰──────────────────────────────────────━━━━━━━━━━━━━━━━━━━━━━━━━━━──────────────────────────────────╯
`));

// Получение аргументов командной строки
const [,, proxyType, proxyFile] = process.argv;

// Проверка, заданы ли аргументы командной строки
if (!proxyType || !proxyFile) {
    console.error(chalk.red("Ошибка: Необходимо указать тип прокси и файл с прокси-серверами."));
    console.error(`Пример: node ${path.basename(__filename)} socks5 socks5.txt`);
    process.exit(1);
}

// Проверка корректности типа прокси
const validProxyTypes = ['http', 'https', 'socks4', 'socks5'];
if (!validProxyTypes.includes(proxyType)) {
    console.error(chalk.red(`Ошибка: неподдерживаемый тип прокси "${proxyType}".`));
    console.error(`Поддерживаемые типы: ${validProxyTypes.join(', ')}.`);
    process.exit(1);
}

// Имя выходного файла на основе типа прокси
const outputFile = `${proxyType}_work.txt`;

// Чтение списка прокси-серверов из файла
const proxyList = fs.readFileSync(proxyFile, 'utf-8').split("\n").filter(proxy => proxy.trim() !== '');

// Проверка существования файла с рабочими прокси и его создание при необходимости
let activeProxiesData = '';
if (fs.existsSync(outputFile)) {
    activeProxiesData = fs.readFileSync(outputFile, 'utf-8');
} else {
    fs.writeFileSync(outputFile, activeProxiesData, 'utf-8');
}

// Установка тайм-аута для проверки прокси
const CHECK_TIMEOUT = 10000;

// Функция для изменения заголовка окна консоли
function updateConsoleTitle(title) {
  process.stdout.write(String.fromCharCode(27) + "]0;" + title + String.fromCharCode(7));
}

// Игнорирование необработанных исключений
process.on('uncaughtException', function (err) {
  console.error("Необработанное исключение:", err.stack);
});

// Перебор всех прокси и их проверка
proxyList.forEach(validateProxy);

const totalProxies = proxyList.length;
let inactiveProxies = 0;
let activeProxies = 0;

// Функция проверки прокси на работоспособность
function validateProxy(proxy) {
  let proxyUrl = `${proxyType}://${proxy}`;

  // Установка параметров запроса
  const requestOptions = {
    url: 'https://api.ipify.org/',
    proxy: proxyUrl,
    timeout: CHECK_TIMEOUT,
  };

  request(requestOptions, function(err, response, body) {
    if (err) {
      console.error(chalk.yellow(`[?] ошибка - ${err.message} ${proxy}`));
      handleInactiveProxy(proxy);
      return;
    }
    
    if (response && response.statusCode === 200) {
      handleActiveProxy(proxy);
    } else {
      console.error(chalk.yellow(`[?] ошибка - неверный статус ответа ${response.statusCode} для ${proxy}`));
      handleInactiveProxy(proxy);
    }
  });
}

// Обработка активного прокси
function handleActiveProxy(proxy) {
  activeProxies += 1;
  updateConsoleTitle(`Всего прокси: ${totalProxies} Проверено: ${inactiveProxies + activeProxies} Рабочих: ${activeProxies}`);
  activeProxiesData += `${proxy}\n`; // Добавление IP:порт без указания типа прокси
  fs.writeFileSync(outputFile, activeProxiesData, 'utf-8');
  console.log(chalk.green(`[+] рабочий - ${proxy}`));
}

// Обработка неактивного прокси
function handleInactiveProxy(proxy) {
  inactiveProxies += 1;
  updateConsoleTitle(`Всего прокси: ${totalProxies} Проверено: ${inactiveProxies + activeProxies} Рабочих: ${activeProxies}`);
  console.log(chalk.red(`[-] не работает - ${proxy}`));
}