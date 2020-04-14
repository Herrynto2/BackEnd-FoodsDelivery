-- phpMyAdmin SQL Dump
-- version 4.9.0.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Apr 14, 2020 at 10:44 AM
-- Server version: 10.3.15-MariaDB
-- PHP Version: 7.3.6

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `food_delivery`
--

-- --------------------------------------------------------

--
-- Table structure for table `cart`
--

CREATE TABLE `cart` (
  `id_cart` int(11) NOT NULL,
  `id_user` int(11) NOT NULL,
  `id_restaurant` int(11) NOT NULL,
  `id_item` int(11) NOT NULL,
  `name_item` varchar(60) NOT NULL,
  `price` int(20) NOT NULL,
  `total_item` int(11) NOT NULL,
  `description` varchar(60) NOT NULL,
  `images` varchar(30) NOT NULL,
  `date_created` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `cart`
--

INSERT INTO `cart` (`id_cart`, `id_user`, `id_restaurant`, `id_item`, `name_item`, `price`, `total_item`, `description`, `images`, `date_created`) VALUES
(118, 65, 36, 77, 'Ayam Kalasan', 17000, 3, 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Min', '/uploads/1584250275363.jpeg', '2020-03-19 17:45:15'),
(119, 65, 36, 78, 'Ayam Geprek', 22000, 1, 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Min', '/uploads/1584250294304.jpeg', '2020-03-19 17:53:20'),
(126, 66, 35, 71, 'Americano Coffee', 12000, 1, 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Min', '/uploads/1584248491423.jpeg', '2020-03-19 21:46:20'),
(130, 66, 36, 80, 'Ayam Katsu', 25000, 61, 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Min', '/uploads/1584250349575.jpeg', '2020-03-20 05:56:03'),
(134, 66, 34, 65, 'Bakso Bakar', 3000, 7, 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Min', '/uploads/1584248060477.jpeg', '2020-03-20 07:45:46'),
(135, 66, 35, 76, 'Mochachino Coffee', 18000, 45, 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Min', '/uploads/1584248597391.jpeg', '2020-03-20 07:47:21'),
(136, 66, 35, 74, 'Latte Coffee', 18000, 1, 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Min', '/uploads/1584248546852.jpeg', '2020-03-20 09:26:52'),
(137, 66, 40, 99, 'Yakiniku', 40000, 2, 'Lorem Empsum', '/uploads/1584659348041.jpeg', '2020-03-20 09:27:24'),
(138, 66, 36, 78, 'Ayam Geprek', 22000, 4, 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Min', '/uploads/1584250294304.jpeg', '2020-03-20 13:30:11'),
(139, 66, 33, 60, 'Pempek Kerupuk', 10000, 3, 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Min', '/uploads/1584247676962.jpeg', '2020-03-20 13:32:07'),
(140, 66, 37, 85, 'Matcha Tea', 16000, 1, 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Min', '/uploads/1584250753963.jpeg', '2020-03-20 14:10:05'),
(141, 66, 37, 84, 'Masala Chai Tea', 14000, 1, 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Min', '/uploads/1584250738244.jpeg', '2020-03-20 14:10:14'),
(153, 38, 36, 78, 'Ayam Geprek', 22000, 25, 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Min', '/uploads/1584250294304.jpeg', '2020-03-30 09:37:57'),
(154, 38, 35, 71, 'Americano Coffee', 12000, 7, 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Min', '/uploads/1584248491423.jpeg', '2020-03-30 10:46:26'),
(155, 38, 35, 74, 'Latte Coffee', 18000, 12, 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Min', '/uploads/1584248546852.jpeg', '2020-03-30 10:47:17');

-- --------------------------------------------------------

--
-- Table structure for table `categories`
--

CREATE TABLE `categories` (
  `id_category` int(11) NOT NULL,
  `category` varchar(60) NOT NULL,
  `id_restaurant` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `categories_id`
--

CREATE TABLE `categories_id` (
  `id` int(11) NOT NULL,
  `category` varchar(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `categories_id`
--

INSERT INTO `categories_id` (`id`, `category`) VALUES
(1, 'Food'),
(2, 'Drink');

-- --------------------------------------------------------

--
-- Table structure for table `foodreview`
--

CREATE TABLE `foodreview` (
  `id` int(11) NOT NULL,
  `id_user` int(11) DEFAULT NULL,
  `name_user` varchar(60) NOT NULL,
  `id_item` varchar(70) DEFAULT NULL,
  `review` varchar(60) DEFAULT NULL,
  `rating` int(11) NOT NULL,
  `date_created` datetime NOT NULL DEFAULT current_timestamp(),
  `date_uploaded` datetime DEFAULT NULL ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `foodreview`
--

INSERT INTO `foodreview` (`id`, `id_user`, `name_user`, `id_item`, `review`, `rating`, `date_created`, `date_uploaded`) VALUES
(12, 39, 'Kevin Za', '58', 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Min', 4, '2020-03-15 11:57:41', '2020-03-15 11:57:41'),
(13, 40, 'Alen Dwi Aya', '58', 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Min', 4, '2020-03-15 12:03:38', '2020-03-15 12:03:38'),
(14, 41, 'Triedho ', '58', 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Min', 4, '2020-03-15 12:33:48', '2020-03-15 12:33:48'),
(15, 42, 'Agus Richard', '58', 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Min', 4, '2020-03-15 12:39:56', '2020-03-15 12:39:56'),
(16, 38, 'Heri Heryanto', '58', 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Min', 0, '2020-03-18 14:58:06', '2020-03-18 14:58:06'),
(17, 38, 'Heri Heryanto', '80', ' haii', 0, '2020-03-18 15:00:20', '2020-03-18 15:00:20'),
(18, 65, 'Raditya Dika', '71', 'This food so delicious', 0, '2020-03-19 05:43:28', '2020-03-19 05:43:28'),
(19, 65, 'Raditya Dika', '58', ' Lorem ipsum dolor sit amet consectetur adipisicing elit. Mi', 0, '2020-03-19 06:19:55', '2020-03-19 06:19:55'),
(25, 65, 'Raditya Dika', '93', 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Min', 0, '2020-03-19 16:38:44', '2020-03-19 16:38:44'),
(27, 65, 'Raditya Dika', '93', 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Min', 0, '2020-03-19 16:39:44', '2020-03-19 16:39:44'),
(28, 65, 'Raditya Dika', '93', 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Min', 0, '2020-03-19 16:39:48', '2020-03-19 16:39:48'),
(29, 65, 'Raditya Dika', '93', 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Min', 0, '2020-03-19 16:39:51', '2020-03-19 16:39:51'),
(30, 65, 'Raditya Dika', '93', 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Min', 0, '2020-03-19 16:39:54', '2020-03-19 16:39:54'),
(31, 65, 'Raditya Dika', '80', 'This food so delicious', 0, '2020-03-19 16:41:39', '2020-03-19 16:41:39'),
(32, 65, 'Raditya Dika', '71', ' I think you must give many michin in this foods', 0, '2020-03-19 18:08:41', '2020-03-19 18:08:41'),
(33, 66, 'Putri Ayu Amalia', '61', 'This food so delicious', 0, '2020-03-19 21:14:53', '2020-03-19 21:14:53'),
(34, 66, 'Putri Ayu Amalia', '61', ' Hmm ... i think you must add salt in that foods', 0, '2020-03-19 21:33:56', '2020-03-19 21:33:56'),
(35, 66, 'Putri Ayu Amalia', '99', ' I feel in japan when taste this foods, ummmm', 0, '2020-03-20 06:00:16', '2020-03-20 06:00:16'),
(36, 66, 'Putri Ayu Amalia', '99', ' Huhh very very.. Delicious', 0, '2020-03-20 06:00:46', '2020-03-20 06:00:46'),
(37, 66, 'Putri Ayu Amalia', '80', ' Woowww what spices that you add in this food ... so spicy :', 0, '2020-03-20 09:25:10', '2020-03-20 09:25:10'),
(38, 38, 'Heri Heryanto', '72', 'Haii', 0, '2020-03-29 19:25:51', '2020-03-29 19:25:51'),
(39, 38, 'Heri Heryanto', '72', 'So delicious', 0, '2020-03-29 19:32:32', '2020-03-29 19:32:32'),
(40, 38, 'Heri Heryanto', '72', 'Amazing', 0, '2020-03-29 19:33:12', '2020-03-29 19:33:13'),
(41, 38, 'Heri Heryanto', '72', 'Wow', 0, '2020-03-29 19:33:45', '2020-03-29 19:33:45'),
(42, 38, 'Heri Heryanto', '72', 'Huh', 0, '2020-03-29 19:34:23', '2020-03-29 19:34:23'),
(43, 38, 'Heri Heryanto', '71', 'So delicious', 0, '2020-03-29 19:37:20', '2020-03-29 19:37:20'),
(44, 38, 'Heri Heryanto', '71', 'Salty', 0, '2020-03-29 19:39:35', '2020-03-29 19:39:35'),
(45, 38, 'Heri Heryanto', '71', 'Wowwwss', 0, '2020-03-29 19:41:17', '2020-03-29 19:41:17'),
(46, 38, 'Heri Heryanto', '71', 'Yummy', 0, '2020-03-29 19:42:02', '2020-03-29 19:42:02'),
(47, 38, 'Heri Heryanto', '71', 'i like it', 0, '2020-03-30 06:11:25', '2020-03-30 06:11:26'),
(48, 38, 'Heri Heryanto', '71', 'Wow', 0, '2020-03-30 06:54:17', '2020-03-30 06:54:17'),
(49, 38, 'Heri Heryanto', '79', 'I like it', 0, '2020-03-30 06:54:52', '2020-03-30 06:54:52');

-- --------------------------------------------------------

--
-- Table structure for table `foodsdata`
--

CREATE TABLE `foodsdata` (
  `id_item` int(11) NOT NULL,
  `id_restaurant` int(11) NOT NULL,
  `name_restaurant` varchar(60) NOT NULL,
  `category` varchar(30) NOT NULL,
  `name_item` varchar(30) DEFAULT NULL,
  `price` varchar(30) DEFAULT NULL,
  `description` varchar(100) DEFAULT NULL,
  `images` varchar(30) DEFAULT NULL,
  `total_item` int(11) NOT NULL,
  `date_created` datetime DEFAULT current_timestamp(),
  `date_updated` datetime DEFAULT NULL ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `foodsdata`
--

INSERT INTO `foodsdata` (`id_item`, `id_restaurant`, `name_restaurant`, `category`, `name_item`, `price`, `description`, `images`, `total_item`, `date_created`, `date_updated`) VALUES
(58, 33, 'Pempek Pak raden', 'Food', 'Pempek Kapal Selam', '20000', 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima reiciendis vitae quod earum, quo cor', '/uploads/1584247629466.jpeg', 100, '2020-03-15 11:47:09', '2020-03-19 06:43:10'),
(59, 33, 'Pempek Pak raden', 'Food', 'Pempek Panggang', '2000', 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima reiciendis vitae quod earum, quo cor', '/uploads/1584247658487.jpeg', 0, '2020-03-15 11:47:38', '2020-03-20 06:31:54'),
(60, 33, 'Pempek Pak raden', 'Food', 'Pempek Kerupuk', '10000', 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima reiciendis vitae quod earum, quo cor', '/uploads/1584247676962.jpeg', 98, '2020-03-15 11:47:56', '2020-03-29 12:18:23'),
(61, 33, 'Pempek Pak raden', 'Food', 'Pempek Lenggang', '10000', 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima reiciendis vitae quod earum, quo cor', '/uploads/1584247697022.png', 10, '2020-03-15 11:48:17', '2020-03-19 06:43:23'),
(62, 33, 'Pempek Pak raden', 'Food', 'Otak-otak', '5000', 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima reiciendis vitae quod earum, quo cor', '/uploads/1584524395326.jpeg', 472, '2020-03-15 11:48:41', '2020-03-19 06:43:27'),
(63, 33, 'Pempek Pak raden', 'Food', 'Pempek Adaan', '3000', 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima reiciendis vitae quod earum, quo cor', '/uploads/1584247748119.jpeg', 60, '2020-03-15 11:49:08', '2020-03-19 06:43:30'),
(64, 33, 'Pempek Pak raden', 'Food', 'Pempek Krispi', '3000', 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima reiciendis vitae quod earum, quo cor', '/uploads/1584247772989.jpeg', 0, '2020-03-15 11:49:33', '2020-03-19 11:02:03'),
(65, 34, 'Warunk Bakso Misteri', 'Food', 'Bakso Bakar', '3000', 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima reiciendis vitae quod earum, quo cor', '/uploads/1584248060477.jpeg', 0, '2020-03-15 11:54:20', '2020-03-19 11:04:14'),
(66, 34, 'Warunk Bakso Misteri', 'Food', 'Bakso Goreng', '7000', 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima reiciendis vitae quod earum, quo cor', '/uploads/1584248078328.jpeg', 0, '2020-03-15 11:54:38', '2020-03-20 06:35:50'),
(67, 34, 'Warunk Bakso Misteri', 'Food', 'Bakso Granad', '12000', 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima reiciendis vitae quod earum, quo cor', '/uploads/1584248109843.jpeg', 100, '2020-03-15 11:55:09', '2020-03-19 06:43:49'),
(68, 34, 'Warunk Bakso Misteri', 'Food', 'Bakso Malang', '12000', 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima reiciendis vitae quod earum, quo cor', '/uploads/1584248126179.jpeg', 100, '2020-03-15 11:55:26', '2020-03-19 06:43:52'),
(69, 34, 'Warunk Bakso Misteri', 'Food', 'Bakso Rica Rica', '20000', 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima reiciendis vitae quod earum, quo cor', '/uploads/1584248143924.jpeg', 100, '2020-03-15 11:55:43', '2020-03-19 06:43:56'),
(70, 34, 'Warunk Bakso Misteri', 'Food', 'Bakso Telur', '20000', 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima reiciendis vitae quod earum, quo cor', '/uploads/1584248171590.jpeg', 100, '2020-03-15 11:56:11', '2020-03-19 06:44:00'),
(71, 35, 'El Cafe', 'Drink', 'Americano Coffee', '12000', 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima reiciendis vitae quod earum, quo cor', '/uploads/1584248491423.jpeg', 72, '2020-03-15 12:01:31', '2020-03-30 10:50:08'),
(72, 35, 'El Cafe', 'Drink', 'Capucino Coffee', '10000', 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima reiciendis vitae quod earum, quo cor', '/uploads/1584248514228.jpeg', 96, '2020-03-15 12:01:54', '2020-03-29 15:56:41'),
(73, 35, 'El Cafe', 'Drink', 'Espresso Coffee', '20000', 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima reiciendis vitae quod earum, quo cor', '/uploads/1584248531729.jpeg', 100, '2020-03-15 12:02:11', '2020-03-19 06:44:11'),
(74, 35, 'El Cafe', 'Drink', 'Latte Coffee', '18000', 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima reiciendis vitae quod earum, quo cor', '/uploads/1584248546852.jpeg', 1, '2020-03-15 12:02:26', '2020-03-20 06:29:52'),
(75, 35, 'El Cafe', 'Drink', 'Ristretto Coffee', '12000', 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima reiciendis vitae quod earum, quo cor', '/uploads/1584248565827.png', 96, '2020-03-15 12:02:45', '2020-03-19 09:15:13'),
(76, 35, 'El Cafe', 'Drink', 'Mochachino Coffee', '18000', 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima reiciendis vitae quod earum, quo cor', '/uploads/1584248597391.jpeg', 86, '2020-03-15 12:03:17', '2020-03-29 12:55:02'),
(77, 36, 'Nelongso Resto', 'Food', 'Ayam Kalasan', '17000', 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima reiciendis vitae quod earum, quo cor', '/uploads/1584250275363.jpeg', 3, '2020-03-15 12:31:15', '2020-03-30 05:37:17'),
(78, 36, 'Nelongso Resto', 'Food', 'Ayam Geprek', '22000', 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima reiciendis vitae quod earum, quo cor', '/uploads/1584250294304.jpeg', 96, '2020-03-15 12:31:34', '2020-03-19 09:16:51'),
(79, 36, 'Nelongso Resto', 'Food', 'Ayam Krispi Saus Madu', '25000', 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima reiciendis vitae quod earum, quo cor', '/uploads/1584250318122.jpeg', 100, '2020-03-15 12:31:58', '2020-03-19 06:44:33'),
(80, 36, 'Nelongso Resto', 'Food', 'Ayam Katsu', '25000', 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima reiciendis vitae quod earum, quo cor', '/uploads/1584250349575.jpeg', 99, '2020-03-15 12:32:29', '2020-03-29 13:18:40'),
(81, 36, 'Nelongso Resto', 'Food', 'Ayam Penyet', '18000', 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima reiciendis vitae quod earum, quo cor', '/uploads/1584250373555.jpeg', 90, '2020-03-15 12:32:53', '2020-03-29 11:38:42'),
(83, 37, 'Tea Garden', 'Drink', 'Bubble Tea', '13000', 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima reiciendis vitae quod earum, quo cor', '/uploads/1584250714734.jpeg', 100, '2020-03-15 12:38:34', '2020-03-19 06:44:43'),
(84, 37, 'Tea Garden', 'Drink', 'Masala Chai Tea', '14000', 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima reiciendis vitae quod earum, quo cor', '/uploads/1584250738244.jpeg', 100, '2020-03-15 12:38:58', '2020-03-19 06:44:47'),
(85, 37, 'Tea Garden', 'Drink', 'Matcha Tea', '16000', 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima reiciendis vitae quod earum, quo cor', '/uploads/1584250753963.jpeg', 100, '2020-03-15 12:39:13', '2020-03-19 06:44:50'),
(86, 37, 'Tea Garden', 'Drink', 'Thai Tea', '11000', 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima reiciendis vitae quod earum, quo cor', '/uploads/1584250773825.jpeg', 100, '2020-03-15 12:39:33', '2020-03-19 06:44:55'),
(87, 37, 'Tea Garden', 'Drink', 'Tarik Tea', '11000', 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima reiciendis vitae quod earum, quo cor', '/uploads/1584250785131.jpeg', 100, '2020-03-15 12:39:45', '2020-03-19 06:44:57'),
(91, 33, 'Pempek Pak raden', 'Food', 'Tekwan', '12000', ' Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quia sapiente corporis, enim voluptates i', '/uploads/1584543855750.jpeg', 100, '2020-03-18 22:04:15', '2020-03-19 06:45:01'),
(93, 38, 'Dapur Sunda', 'Food', 'Soto Bandung', '30000', 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt itaque repellat quidem pariatur rerum', '/uploads/1584545558194.jpeg', 100, '2020-03-18 22:32:38', '2020-03-19 06:45:09'),
(94, 38, 'Dapur Sunda', 'Food', 'Pepes Ikan', '18000', 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt itaque repellat quidem pariatur rerum', '/uploads/1584545634916.jpeg', 50, '2020-03-18 22:33:54', '2020-03-19 06:45:12'),
(95, 38, 'Dapur Sunda', 'Food', 'Nasi Liwet', '22000', 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt itaque repellat quidem pariatur rerum', '/uploads/1584545671508.png', 40, '2020-03-18 22:34:31', '2020-03-19 06:45:15'),
(97, 38, 'Dapur Sunda', 'Food', 'Nasi Oncom', '300000', 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Provident, maiores.', '/uploads/1584602625570.jpeg', 100, '2020-03-19 14:23:45', '2020-03-19 14:23:46'),
(99, 40, 'Ajihara Sashimi', 'Food ', 'Yakiniku', '40000', 'Lorem Empsum', '/uploads/1584659348041.jpeg', 311, '2020-03-19 22:47:18', '2020-03-20 06:19:39');

-- --------------------------------------------------------

--
-- Table structure for table `restodata`
--

CREATE TABLE `restodata` (
  `id_restaurant` int(11) NOT NULL,
  `id_user` int(11) NOT NULL,
  `name_restaurant` varchar(30) DEFAULT NULL,
  `logo` varchar(30) DEFAULT NULL,
  `location` varchar(60) DEFAULT NULL,
  `description` text DEFAULT NULL,
  `created_by` varchar(30) NOT NULL,
  `date_created` datetime NOT NULL DEFAULT current_timestamp(),
  `date_updated` datetime DEFAULT NULL ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `restodata`
--

INSERT INTO `restodata` (`id_restaurant`, `id_user`, `name_restaurant`, `logo`, `location`, `description`, `created_by`, `date_created`, `date_updated`) VALUES
(33, 38, 'Pempek Pak raden', '/uploads/1584523102246.jpeg', 'Palembang', 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima reiciendis vitae quod earum, quo corporis ad error enim aliquam. Modi enim eum ex illo minima dolorum similique, voluptas sit', 'Heri Heryanto', '2020-03-15 11:44:30', '2020-03-29 19:55:33'),
(34, 39, 'Warunk Bakso Misteri', '/uploads/1584248020839.jpeg', 'Bogor', 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima reiciendis vitae quod earum, quo corporis ad error enim aliquam. Modi enim eum ex illo minima dolorum similique, voluptas sit voluptate?', 'Kevin', '2020-03-15 11:53:41', NULL),
(35, 40, 'El Cafe', '/uploads/1584248442807.jpeg', 'Kupang', 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima reiciendis vitae quod earum, quo corporis ad error enim aliquam. Modi enim eum ex illo minima dolorum similique, voluptas sit voluptate?', 'Alen Dwi', '2020-03-15 12:00:42', NULL),
(36, 41, 'Nelongso Resto', '/uploads/1584248996629.jpeg', 'Malang', 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima reiciendis vitae quod earum, quo corporis ad error enim aliquam. Modi enim eum ex illo minima dolorum similique, voluptas sit voluptate?', 'Triedo', '2020-03-15 12:09:56', NULL),
(37, 42, 'Tea Garden', '/uploads/1584250677791.jpeg', 'Depok', 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima reiciendis vitae quod earum, quo corporis ad error enim aliquam. Modi enim eum ex illo minima dolorum similique, voluptas sit voluptate?', 'agusrichard', '2020-03-15 12:37:57', NULL),
(38, 65, 'Dapur Sunda', '/uploads/1584576571463.jpeg', 'Jakarta Selatan', ' Lorem ipsum, dolor sit amet consectetur adipisicing elit. Obcaecati sit aperiam maiores dolor porro numquam?', 'Raditya Dika', '2020-03-18 22:29:58', '2020-03-19 09:59:52'),
(40, 66, 'Ajihara Sashimi', '/uploads/1584626326609.jpeg', 'Tanggerang Bintaro', 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eum eaque totam quos excepturi vel rerum', 'Putri ayu', '2020-03-19 20:58:46', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `transaction`
--

CREATE TABLE `transaction` (
  `id` int(11) NOT NULL,
  `id_cart` int(11) NOT NULL,
  `id_user` int(11) NOT NULL,
  `name_user` varchar(60) NOT NULL,
  `email` varchar(60) NOT NULL,
  `id_restaurant` int(11) NOT NULL,
  `id_item` int(11) NOT NULL,
  `name_item` varchar(60) NOT NULL,
  `price` int(11) NOT NULL,
  `total` int(11) NOT NULL,
  `total_price` int(11) NOT NULL,
  `date_created` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `transaction`
--

INSERT INTO `transaction` (`id`, `id_cart`, `id_user`, `name_user`, `email`, `id_restaurant`, `id_item`, `name_item`, `price`, `total`, `total_price`, `date_created`) VALUES
(54, 95, 38, 'Heri Heryanto', 'herryheryanto22@gmail.com', 36, 78, 'Ayam Geprek', 22000, 2, 2000, '2020-03-19 09:16:51'),
(68, 99, 65, 'Raditya Dika', 'herryheryanto22@gmail.com', 34, 66, 'Bakso Goreng', 7000, 1, 5000, '2020-03-19 09:35:02'),
(69, 102, 65, 'Raditya Dika', 'herryheryanto22@gmail.com', 38, 92, 'Empal Gepuk', 22000, 3, 939000, '2020-03-19 09:40:43'),
(70, 106, 65, 'Raditya Dika', 'herryheryanto22@gmail.com', 33, 64, 'Pempek Krispi', 3000, 1, 936000, '2020-03-19 11:02:02'),
(71, 107, 65, 'Raditya Dika', 'herryheryanto22@gmail.com', 34, 65, 'Bakso Bakar', 3000, 4, 924000, '2020-03-19 11:04:13'),
(72, 129, 66, 'Putri Ayu Amalia', 'herryheryanto22@gmail.com', 36, 81, 'Ayam Penyet', 18000, 1, 99983100, '2020-03-20 06:29:51'),
(73, 128, 66, 'Putri Ayu Amalia', 'herryheryanto22@gmail.com', 36, 81, 'Ayam Penyet', 18000, 1, 99981100, '2020-03-20 06:31:54'),
(74, 131, 66, 'Putri Ayu Amalia', 'herryheryanto22@gmail.com', 36, 81, 'Ayam Penyet', 18000, 1, 99978100, '2020-03-20 06:33:31'),
(75, 132, 66, 'Putri Ayu Amalia', 'herryheryanto22@gmail.com', 36, 81, 'Ayam Penyet', 18000, 1, 99971100, '2020-03-20 06:35:49'),
(76, 125, 66, 'Putri Ayu Amalia', 'herryheryanto22@gmail.com', 36, 81, 'Ayam Penyet', 18000, 1, 99954100, '2020-03-20 06:50:56'),
(77, 112, 38, 'Heri Heryanto', 'herryheryanto22@gmail.com', 36, 81, 'Ayam Penyet', 18000, 10, 180000, '2020-03-29 11:38:42'),
(78, 113, 38, 'Heri Heryanto', 'herryheryanto22@gmail.com', 33, 60, 'Pempek Kerupuk', 10000, 1, 10000, '2020-03-29 12:15:59'),
(79, 113, 38, 'Heri Heryanto', 'herryheryanto22@gmail.com', 33, 60, 'Pempek Kerupuk', 10000, 1, 10000, '2020-03-29 12:18:23'),
(80, 115, 38, 'Heri Heryanto', 'herryheryanto22@gmail.com', 35, 76, 'Mochachino Coffee', 18000, 1, 18000, '2020-03-29 12:23:37'),
(81, 115, 38, 'Heri Heryanto', 'herryheryanto22@gmail.com', 35, 76, 'Mochachino Coffee', 18000, 2, 36000, '2020-03-29 12:46:31'),
(82, 115, 38, 'Heri Heryanto', 'herryheryanto22@gmail.com', 35, 76, 'Mochachino Coffee', 18000, 2, 36000, '2020-03-29 12:46:46'),
(83, 115, 38, 'Heri Heryanto', 'herryheryanto22@gmail.com', 35, 76, 'Mochachino Coffee', 18000, 9, 162000, '2020-03-29 12:55:02'),
(84, 116, 38, 'Heri Heryanto', 'herryheryanto22@gmail.com', 35, 71, 'Americano Coffee', 12000, 1, 12000, '2020-03-29 13:14:09'),
(85, 116, 38, 'Heri Heryanto', 'herryheryanto22@gmail.com', 35, 71, 'Americano Coffee', 12000, 1, 12000, '2020-03-29 13:15:58'),
(86, 116, 38, 'Heri Heryanto', 'herryheryanto22@gmail.com', 35, 71, 'Americano Coffee', 12000, 1, 12000, '2020-03-29 13:16:02'),
(87, 116, 38, 'Heri Heryanto', 'herryheryanto22@gmail.com', 35, 71, 'Americano Coffee', 12000, 1, 12000, '2020-03-29 13:16:59'),
(88, 117, 38, 'Heri Heryanto', 'herryheryanto22@gmail.com', 35, 71, 'Americano Coffee', 12000, 1, 25000, '2020-03-29 13:18:40'),
(89, 116, 38, 'Heri Heryanto', 'herryheryanto22@gmail.com', 35, 71, 'Americano Coffee', 12000, 1, 12000, '2020-03-29 13:20:25'),
(90, 116, 38, 'Heri Heryanto', 'herryheryanto22@gmail.com', 35, 71, 'Americano Coffee', 12000, 1, 12000, '2020-03-29 13:21:10'),
(91, 116, 38, 'Heri Heryanto', 'herryheryanto22@gmail.com', 35, 71, 'Americano Coffee', 12000, 1, 12000, '2020-03-29 13:21:39'),
(92, 116, 38, 'Heri Heryanto', 'herryheryanto22@gmail.com', 35, 71, 'Americano Coffee', 12000, 1, 12000, '2020-03-29 13:22:41'),
(93, 116, 38, 'Heri Heryanto', 'herryheryanto22@gmail.com', 35, 71, 'Americano Coffee', 12000, 1, 12000, '2020-03-29 13:25:05'),
(94, 116, 38, 'Heri Heryanto', 'herryheryanto22@gmail.com', 35, 71, 'Americano Coffee', 12000, 1, 12000, '2020-03-29 13:28:03'),
(95, 116, 38, 'Heri Heryanto', 'herryheryanto22@gmail.com', 35, 71, 'Americano Coffee', 12000, 2, 24000, '2020-03-29 13:30:17'),
(96, 116, 38, 'Heri Heryanto', 'herryheryanto22@gmail.com', 35, 71, 'Americano Coffee', 12000, 1, 12000, '2020-03-29 13:35:08'),
(97, 116, 38, 'Heri Heryanto', 'herryheryanto22@gmail.com', 35, 71, 'Americano Coffee', 12000, 5, 60000, '2020-03-29 13:36:30'),
(98, 116, 38, 'Heri Heryanto', 'herryheryanto22@gmail.com', 35, 71, 'Americano Coffee', 12000, 2, 24000, '2020-03-29 13:36:50'),
(99, 116, 38, 'Heri Heryanto', 'herryheryanto22@gmail.com', 35, 71, 'Americano Coffee', 12000, 1, 12000, '2020-03-29 13:38:32'),
(100, 116, 38, 'Heri Heryanto', 'herryheryanto22@gmail.com', 35, 71, 'Americano Coffee', 12000, 1, 12000, '2020-03-29 13:39:48'),
(101, 116, 38, 'Heri Heryanto', 'herryheryanto22@gmail.com', 35, 71, 'Americano Coffee', 12000, 1, 12000, '2020-03-29 13:42:10'),
(102, 145, 38, 'Heri Heryanto', 'herryheryanto22@gmail.com', 36, 77, 'Ayam Kalasan', 17000, 2, 20000, '2020-03-29 15:53:45'),
(103, 145, 38, 'Heri Heryanto', 'herryheryanto22@gmail.com', 36, 77, 'Ayam Kalasan', 17000, 1, 10000, '2020-03-29 15:56:29'),
(104, 145, 38, 'Heri Heryanto', 'herryheryanto22@gmail.com', 36, 77, 'Ayam Kalasan', 17000, 1, 10000, '2020-03-29 15:56:40'),
(105, 150, 38, 'Heri Heryanto', 'herryheryanto22@gmail.com', 36, 77, 'Ayam Kalasan', 17000, 1, 17000, '2020-03-30 05:37:17'),
(106, 154, 38, 'Heri Heryanto', 'herryheryanto22@gmail.com', 36, 77, 'Ayam Kalasan', 17000, 5, 60000, '2020-03-30 10:50:07');

-- --------------------------------------------------------

--
-- Table structure for table `userdetail`
--

CREATE TABLE `userdetail` (
  `id_user` int(11) NOT NULL,
  `id_role` int(11) NOT NULL,
  `name_user` varchar(70) DEFAULT NULL,
  `email` varchar(60) DEFAULT NULL,
  `gender` varchar(20) DEFAULT NULL,
  `address` varchar(100) NOT NULL,
  `work` varchar(30) DEFAULT NULL,
  `images` varchar(150) NOT NULL,
  `Saldo` int(21) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `userdetail`
--

INSERT INTO `userdetail` (`id_user`, `id_role`, `name_user`, `email`, `gender`, `address`, `work`, `images`, `Saldo`) VALUES
(38, 3, 'Heri Heryanto', 'herryheryanto22@gmail.com', 'Man', 'Depok', 'Front End Developer', '/uploads/1584520887877.jpeg', 8208000),
(39, 3, 'Kevin Za', 'evinzak@gmail.com', 'Man', 'Bogor', 'Front End Developer', '', 0),
(40, 3, 'Alen Dwi Aya', 'alendwi@gmail.com', 'Man', 'Kupang', 'Back End Developer', '', 0),
(41, 3, 'Triedho ', 'triedo@gmail.com', 'Man', 'Malang', 'Front End Developer', '', 0),
(42, 3, 'Agus Richard', 'richard@gmail.com', 'Man', 'Depok', 'Back End Developer', '', 0),
(63, 3, 'bayusaputra', 'herryheryanto22@gmail.com', 'Man', 'Bandung', 'Marketing', '', 0),
(64, 3, 'treidomunandar', 'herryheryanto22@gmail.com', 'Man', 'Malang', 'Web Developer', '', 0),
(65, 3, 'Raditya Dika', 'herryheryanto22@gmail.com', 'Man', ' Pasar Senen Jakarta Selatan', 'Writer', '/uploads/1584544160294.jpeg', 924000),
(66, 3, 'Putri Ayu Amalia', 'herryheryanto22@gmail.com', 'Woman', 'Bintaro Tanggerang Selatan', 'Nurse', '/uploads/1584656394070.jpeg', 99954100),
(67, 3, 'Angelina ', 'Herryheryanto22@gmail.com', NULL, '', NULL, '', 40000),
(68, 3, 'Andre Maulana', 'Herryheryanto22@gmail.com', NULL, '', NULL, '', 0);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id_user` int(11) NOT NULL,
  `username` varchar(30) DEFAULT NULL,
  `password` varchar(100) DEFAULT NULL,
  `is_superadmin` tinyint(4) NOT NULL,
  `is_admin` tinyint(4) NOT NULL,
  `is_verified` tinyint(11) NOT NULL,
  `verification_code` varchar(30) NOT NULL,
  `created_at` datetime NOT NULL DEFAULT current_timestamp(),
  `updated_at` datetime DEFAULT NULL ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id_user`, `username`, `password`, `is_superadmin`, `is_admin`, `is_verified`, `verification_code`, `created_at`, `updated_at`) VALUES
(38, 'herrynto', '$2a$10$h8hSwpauprU9azdUWKqQPOSlrZz/ustuPphT66H5XKx9MzEtVHUdi', 1, 1, 1, '', '2020-03-15 11:29:46', '2020-03-16 12:35:26'),
(39, 'kevinza', '$2a$10$vQBK7C22zMYOul9jXPRSye9EMaInWZhzIyoEpkKZwHnQPEKk6mktq', 0, 1, 1, '', '2020-03-15 11:51:05', '2020-03-15 11:53:41'),
(40, 'alendwi', '$2a$10$vQBK7C22zMYOul9jXPRSye9EMaInWZhzIyoEpkKZwHnQPEKk6mktq', 0, 1, 1, '', '2020-03-15 11:58:25', '2020-03-15 12:00:43'),
(41, 'triedho', '$2a$10$vQBK7C22zMYOul9jXPRSye9EMaInWZhzIyoEpkKZwHnQPEKk6mktq', 0, 1, 1, '', '2020-03-15 12:04:21', '2020-03-15 12:09:56'),
(42, 'agusrichard', '$2a$10$vQBK7C22zMYOul9jXPRSye9EMaInWZhzIyoEpkKZwHnQPEKk6mktq', 0, 1, 1, '', '2020-03-15 12:34:31', '2020-03-15 12:37:57'),
(63, 'bayusaputra', '$2a$10$UapTn6/g0eHEv/sKIwU3KeH1.SqLegNq7l3eX4aR0MPN4YhzkXIou', 0, 0, 1, '', '2020-03-16 09:31:54', '2020-03-16 09:32:47'),
(64, 'munandar', '$2a$10$UapTn6/g0eHEv/sKIwU3KePD/Mu5sfLpEgFj.2al7BXFkqtPImY/m', 0, 0, 1, '', '2020-03-16 10:09:35', '2020-03-16 10:10:44'),
(65, 'radityadika', '$2a$10$4j2.IqSzilZCMr3xfo047uvtQSSBRkatX14bYO0hchZGy.8aHq5We', 0, 1, 1, '', '2020-03-18 22:06:26', '2020-03-19 05:49:27'),
(66, 'putriayu', '$2a$10$cOyptiY1c5DIYaAIW3D.FOXUfqIdqEgZIBvg/aVAswQaTany4b/fy', 0, 1, 1, '', '2020-03-19 20:25:25', '2020-03-19 20:56:02'),
(67, 'angelina', '$2a$10$zfrMRqp.3/RKEyFYfJ.lpO1iCbRPgRQVywj.zzjtPYbnUNNCM3mZm', 0, 0, 1, '', '2020-03-30 01:59:21', '2020-03-30 02:00:40'),
(68, 'andremaulana', '$2a$10$zfrMRqp.3/RKEyFYfJ.lpO1iCbRPgRQVywj.zzjtPYbnUNNCM3mZm', 0, 0, 1, '', '2020-03-30 10:51:13', '2020-03-30 10:51:41');

-- --------------------------------------------------------

--
-- Table structure for table `usersrole`
--

CREATE TABLE `usersrole` (
  `id_role` int(11) NOT NULL,
  `user_role` varchar(30) NOT NULL,
  `description` varchar(150) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `usersrole`
--

INSERT INTO `usersrole` (`id_role`, `user_role`, `description`) VALUES
(1, 'Super Admin', ''),
(2, 'Admin', ''),
(3, 'User', ''),
(4, 'Guest', '');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `cart`
--
ALTER TABLE `cart`
  ADD PRIMARY KEY (`id_cart`);

--
-- Indexes for table `categories`
--
ALTER TABLE `categories`
  ADD PRIMARY KEY (`id_category`);

--
-- Indexes for table `categories_id`
--
ALTER TABLE `categories_id`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `foodreview`
--
ALTER TABLE `foodreview`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `foodsdata`
--
ALTER TABLE `foodsdata`
  ADD PRIMARY KEY (`id_item`);

--
-- Indexes for table `restodata`
--
ALTER TABLE `restodata`
  ADD PRIMARY KEY (`id_restaurant`);

--
-- Indexes for table `transaction`
--
ALTER TABLE `transaction`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `userdetail`
--
ALTER TABLE `userdetail`
  ADD PRIMARY KEY (`id_user`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id_user`);

--
-- Indexes for table `usersrole`
--
ALTER TABLE `usersrole`
  ADD PRIMARY KEY (`id_role`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `cart`
--
ALTER TABLE `cart`
  MODIFY `id_cart` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=156;

--
-- AUTO_INCREMENT for table `categories`
--
ALTER TABLE `categories`
  MODIFY `id_category` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=31;

--
-- AUTO_INCREMENT for table `categories_id`
--
ALTER TABLE `categories_id`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `foodreview`
--
ALTER TABLE `foodreview`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=50;

--
-- AUTO_INCREMENT for table `foodsdata`
--
ALTER TABLE `foodsdata`
  MODIFY `id_item` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=101;

--
-- AUTO_INCREMENT for table `restodata`
--
ALTER TABLE `restodata`
  MODIFY `id_restaurant` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=41;

--
-- AUTO_INCREMENT for table `transaction`
--
ALTER TABLE `transaction`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=107;

--
-- AUTO_INCREMENT for table `userdetail`
--
ALTER TABLE `userdetail`
  MODIFY `id_user` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=69;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id_user` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=69;

--
-- AUTO_INCREMENT for table `usersrole`
--
ALTER TABLE `usersrole`
  MODIFY `id_role` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
