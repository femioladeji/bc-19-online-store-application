-- phpMyAdmin SQL Dump
-- version 4.5.1
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1
-- Generation Time: Aug 29, 2016 at 10:46 AM
-- Server version: 10.1.13-MariaDB
-- PHP Version: 7.0.8

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `online-store`
--

-- --------------------------------------------------------

--
-- Table structure for table `category`
--

CREATE TABLE `category` (
  `id` int(11) NOT NULL,
  `category_name` varchar(45) NOT NULL,
  `category_desc` text
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `category`
--

INSERT INTO `category` (`id`, `category_name`, `category_desc`) VALUES
(1, 'Phones & Tablets', 'All mobile devices'),
(2, 'Computers & Accessories', 'Laptops, desktops and their accessories'),
(3, 'Electronics', 'Electronic products'),
(4, 'Fashion & Wears', NULL),
(5, 'Home & Kitchen Appliances', NULL),
(6, 'Automobile', NULL),
(7, 'Food', NULL),
(8, 'Other Category', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `products`
--

CREATE TABLE `products` (
  `id` int(11) NOT NULL,
  `product_name` varchar(45) NOT NULL,
  `product_desc` text NOT NULL,
  `price` varchar(45) NOT NULL,
  `product_image` varchar(50) NOT NULL,
  `category_id` int(11) NOT NULL,
  `stores_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `products`
--

INSERT INTO `products` (`id`, `product_name`, `product_desc`, `price`, `product_image`, `category_id`, `stores_id`) VALUES
(13, 'Aunties Bread', 'A well baked bread for all occassion including wedding', '310', '6212945752c6a778b50201b9d0009101.jpeg', 1, 15),
(14, 'Bentley', 'A fine car', '20000000', '61d2e3e460d0391ea3a4d3e7340770c7.jpeg', 1, 16),
(15, 'Airplane', 'a fine plane', '10000000000', 'b58a26003282da14571aa0b4ac1ee031.jpeg', 1, 16),
(16, 'Ancar', 'Cars used by Andela fellows Cars used by Andela fellows Cars used by Andela fellows Cars used by Andela fellows Cars used by Andela fellows', '600000', '4ea0e7039675838e32908098ce017f88.png', 1, 16),
(17, 'Ancar2', 'Cars used by Andela fellows Cars used by Andela fellows Cars used by Andela fellows Cars used by Andela fellows Cars used by Andela fellows', '600000', '4ea0e7039675838e32908098ce017f88.png', 1, 16),
(18, 'Bentley2', 'A fine car', '20000000', '61d2e3e460d0391ea3a4d3e7340770c7.jpeg', 1, 16),
(19, 'Airplane2', 'a fine plane', '10000000000', 'b58a26003282da14571aa0b4ac1ee031.jpeg', 1, 16),
(20, 'Andela', 'A software for andela fellows', '2000000', 'fe52ff5d182bf2314ebe180b23da5985.jpeg', 1, 17),
(21, 'Water', 'A well packaged water', '50', '8bb2f1e6dfe98e4c158e6704f9455cf9.png', 1, 17),
(23, 'Laptop2', 'An AI laptop that writes your code for you. A next gen laptop', '6000000', '38064148ea8485276d6b97236bde4cb1.jpeg', 2, 15);

-- --------------------------------------------------------

--
-- Table structure for table `stores`
--

CREATE TABLE `stores` (
  `id` int(11) NOT NULL,
  `storename` varchar(45) NOT NULL,
  `description` text NOT NULL,
  `address` text NOT NULL,
  `contact` varchar(15) NOT NULL,
  `link` varchar(45) NOT NULL,
  `users_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `stores`
--

INSERT INTO `stores` (`id`, `storename`, `description`, `address`, `contact`, `link`, `users_id`) VALUES
(15, 'Shopleft', 'A fierce competitor to shoprite', 'Ibadan', '08012345678', '21472217823241', 2),
(16, 'Lancars', 'We sell arrays, lists and dictionaries of cars', 'All over Nigeria', '08010293847', '21472217906415', 2),
(17, 'Odunstores International', 'We sell software', 'Yaba, Lagos', '01928374657', '121472282581642', 12),
(18, 'Andela', 'Andela''s shop is the best when it comes to exporting of software', 'Yaba, Lagos', '3898938498932', '21472409792349', 2),
(19, 'Another Store', 'Updated description', 'Here', '88978767', '21472446029540', 2),
(20, 'Test store', 'A brief description about the store', 'Up and down', '0987654318', '21472458400678', 2),
(21, 'Test store', 'A brief description about the store', 'Up and down', '0987654318', '21472458723657', 2),
(22, 'Test store', 'A brief description about the store', 'Up and down', '0987654318', '21472458783343', 2);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `email` varchar(100) NOT NULL,
  `firstname` varchar(45) NOT NULL,
  `lastname` varchar(45) NOT NULL,
  `password` varchar(64) NOT NULL,
  `salt` varchar(64) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `email`, `firstname`, `lastname`, `password`, `salt`) VALUES
(2, 'femidotexe@gmail.com', 'Javascript', 'Developer', 'dd5e7db32fd3d02838d495bd32ecf20896f647f31a3286028bd7b4aaabee82eb', 'f4e4b3395f2be3d874a0067091ecd54f'),
(3, 'femi.pixels@gmail.com', 'Femi', 'Abolaji', '7e35c61e0497a185a3e0df48379495bd9545acf13396a41d9c75ebbf63bf3eca', '5bf679c6fb2ee7092955c54fb7ea51f6'),
(11, 'femi.systems@gmail.com', 'Abolaji', 'Femi', 'b530c2da460c846db05a265a5d7d8f4e4f49644c8f3cb48cdb354aa727a47487', '480c56ada8408057381f195f460f9c7f'),
(12, 'stephen@gmail.com', 'Stephen', 'Oduntan', 'b1b07a4563e288f011e8b98a31708f2baff753aa02e74dafd6b8927ce6367185', '1326cf3d481c7ba95fcb68dad453660e'),
(29, 'new@mail.com', 'New', 'User', 'a8e7942ec24d90a51f26c202fee47d3ed6310182fdd2924b8b1f8f162745e23c', 'c59f7d6284cbf9eb8c093929875278ba');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `category`
--
ALTER TABLE `category`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_products_category1_idx` (`category_id`),
  ADD KEY `fk_products_stores1_idx` (`stores_id`);

--
-- Indexes for table `stores`
--
ALTER TABLE `stores`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_stores_users_idx` (`users_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email_UNIQUE` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `category`
--
ALTER TABLE `category`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;
--
-- AUTO_INCREMENT for table `products`
--
ALTER TABLE `products`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=24;
--
-- AUTO_INCREMENT for table `stores`
--
ALTER TABLE `stores`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=23;
--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=54;
--
-- Constraints for dumped tables
--

--
-- Constraints for table `products`
--
ALTER TABLE `products`
  ADD CONSTRAINT `fk_products_stores1` FOREIGN KEY (`stores_id`) REFERENCES `stores` (`id`);

--
-- Constraints for table `stores`
--
ALTER TABLE `stores`
  ADD CONSTRAINT `fk_stores_users` FOREIGN KEY (`users_id`) REFERENCES `users` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
