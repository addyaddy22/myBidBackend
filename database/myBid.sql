-- phpMyAdmin SQL Dump
-- version 5.1.1deb5ubuntu1
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Sep 02, 2022 at 05:12 PM
-- Server version: 8.0.30-0ubuntu0.22.04.1
-- PHP Version: 8.1.2

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `myBid`
--

-- --------------------------------------------------------

--
-- Table structure for table `bidding`
--

CREATE TABLE `bidding` (
  `bid_id` int NOT NULL,
  `user` varchar(100) NOT NULL,
  `product_id` int NOT NULL,
  `amount` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `bidding`
--

INSERT INTO `bidding` (`bid_id`, `user`, `product_id`, `amount`) VALUES
(1, 'reg1', 1, 700),
(2, 'reg1', 1, 700),
(3, 'reg1', 1, 700),
(4, 'reg1', 1, 850),
(5, 'reg1', 1, 700),
(6, 'reg1', 1, 700);

-- --------------------------------------------------------

--
-- Table structure for table `products`
--

CREATE TABLE `products` (
  `id` int NOT NULL,
  `name` varchar(100) NOT NULL,
  `description` varchar(100) NOT NULL,
  `image` varchar(255) NOT NULL,
  `price` decimal(10,0) NOT NULL,
  `date` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `expiry_date` timestamp NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `products`
--

INSERT INTO `products` (`id`, `name`, `description`, `image`, `price`, `date`, `expiry_date`) VALUES
(1, 'circuit', 'best circuit design ever', 'circuit_2.png', '5', '2022-09-02 03:12:37.882020', '0000-00-00 00:00:00'),
(2, 'Queen Bed\r\n', 'Most comfortable beds', 'bed1.jpeg', '180', '2022-09-02 03:15:31.874322', '0000-00-00 00:00:00'),
(3, 'Holstein Freisien Cow', 'best cows on the market', 'cow1.jpeg', '650', '2022-09-02 03:16:48.522238', '0000-00-00 00:00:00'),
(4, 'Hp-Pro-Book', 'Super efficient Laptop', 'comp1.jpeg', '0', '2022-09-02 03:18:29.448294', '0000-00-00 00:00:00'),
(5, 'Hp-Pro-Book', 'Super efficient Laptop', 'comp1.jpeg', '700', '2022-09-02 03:18:29.448294', '0000-00-00 00:00:00');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `bidding`
--
ALTER TABLE `bidding`
  ADD PRIMARY KEY (`bid_id`);

--
-- Indexes for table `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `bidding`
--
ALTER TABLE `bidding`
  MODIFY `bid_id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `products`
--
ALTER TABLE `products`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
