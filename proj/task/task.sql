-- phpMyAdmin SQL Dump
-- version 4.0.10
-- http://www.phpmyadmin.net
--
-- Хост: 127.0.0.1:3306
-- Время создания: Июл 02 2015 г., 19:06
-- Версия сервера: 5.5.38-log
-- Версия PHP: 5.3.28

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- База данных: `taskmanager`
--

-- --------------------------------------------------------

--
-- Структура таблицы `comments`
--

CREATE TABLE IF NOT EXISTS `comments` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user` varchar(30) NOT NULL,
  `role` varchar(20) NOT NULL,
  `comment` text NOT NULL,
  `task_number` int(10) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 AUTO_INCREMENT=3 ;

--
-- Дамп данных таблицы `comments`
--

INSERT INTO `comments` (`id`, `user`, `role`, `comment`, `task_number`) VALUES
(2, 'dima', 'admin', 'first coment', 12);

-- --------------------------------------------------------

--
-- Структура таблицы `prior`
--

CREATE TABLE IF NOT EXISTS `prior` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(10) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 AUTO_INCREMENT=4 ;

--
-- Дамп данных таблицы `prior`
--

INSERT INTO `prior` (`id`, `name`) VALUES
(1, 'High'),
(2, 'Middle'),
(3, 'Low');

-- --------------------------------------------------------

--
-- Структура таблицы `project`
--

CREATE TABLE IF NOT EXISTS `project` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(20) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 AUTO_INCREMENT=3 ;

--
-- Дамп данных таблицы `project`
--

INSERT INTO `project` (`id`, `name`) VALUES
(1, 'gep'),
(2, 'webinvestpro');

-- --------------------------------------------------------

--
-- Структура таблицы `role`
--

CREATE TABLE IF NOT EXISTS `role` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(20) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 AUTO_INCREMENT=5 ;

--
-- Дамп данных таблицы `role`
--

INSERT INTO `role` (`id`, `name`) VALUES
(1, 'admin'),
(2, 'programmer'),
(3, 'tester');

-- --------------------------------------------------------

--
-- Структура таблицы `status`
--

CREATE TABLE IF NOT EXISTS `status` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(15) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=6 ;

--
-- Дамп данных таблицы `status`
--

INSERT INTO `status` (`id`, `name`) VALUES
(1, 'open'),
(2, 'verified'),
(3, 'closed'),
(4, 'done'),
(5, 'local verified');

-- --------------------------------------------------------

--
-- Структура таблицы `task`
--

CREATE TABLE IF NOT EXISTS `task` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(40) NOT NULL,
  `task_text` text NOT NULL,
  `priority` varchar(10) NOT NULL,
  `project` varchar(20) NOT NULL,
  `status` varchar(20) NOT NULL DEFAULT 'open',
  `access` varchar(20) NOT NULL,
  `parent` int(11) NOT NULL,
  `time_start` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `time_end` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=18 ;

--
-- Дамп данных таблицы `task`
--

INSERT INTO `task` (`id`, `name`, `task_text`, `priority`, `project`, `status`, `access`, `parent`, `time_start`, `time_end`) VALUES
(11, 'таск', '<p>варпаоапо</p>', 'High', 'gep', 'open', 'dima', 0, '2015-07-01 10:16:06', '0000-00-00 00:00:00'),
(12, 'task12', '<p><b>task12</b></p><p></p><p><br/></p><ol><li><b>это   </b>аврпар</li></ol><p></p>', 'High', 'gep', 'open', 'dima', 0, '2015-07-02 08:50:02', '0000-00-00 00:00:00'),
(13, 'таск13', '<h3><b>ывавы</b></h3>', 'Low', 'webinvestpro', 'open', 'olesya', 0, '2015-07-01 10:25:11', '0000-00-00 00:00:00'),
(15, 'task 14', '<p>123</p>', 'High', 'gep', 'open', 'dima', 13, '2015-07-02 11:00:16', '0000-00-00 00:00:00'),
(16, 'подтаск15', '<blockquote><p>вар<u>ыыаоао</u></p></blockquote>', 'High', 'gep', 'open', 'dima', 13, '2015-07-02 11:23:24', '0000-00-00 00:00:00'),
(17, 'bora', '<p>bora bora</p>', 'High', 'gep', 'open', 'dima', 0, '2015-07-02 13:23:01', '0000-00-00 00:00:00');

-- --------------------------------------------------------

--
-- Структура таблицы `user`
--

CREATE TABLE IF NOT EXISTS `user` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `login` varchar(20) NOT NULL,
  `password` varchar(200) NOT NULL,
  `role` varchar(10) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 AUTO_INCREMENT=8 ;

--
-- Дамп данных таблицы `user`
--

INSERT INTO `user` (`id`, `login`, `password`, `role`) VALUES
(1, 'dima', '202cb962ac59075b964b07152d234b70', 'admin'),
(3, 'test', '202cb962ac59075b964b07152d234b70', 'tester'),
(4, 'olesya', '202cb962ac59075b964b07152d234b70', 'admin'),
(7, 'vlad', '202cb962ac59075b964b07152d234b70', 'programmer');

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
