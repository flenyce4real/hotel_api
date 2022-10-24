-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3306
-- Generation Time: Oct 24, 2022 at 03:45 PM
-- Server version: 8.0.30
-- PHP Version: 7.4.26

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `hotel_api`
--

-- --------------------------------------------------------

--
-- Table structure for table `bookings`
--

DROP TABLE IF EXISTS `bookings`;
CREATE TABLE IF NOT EXISTS `bookings` (
  `sn` int NOT NULL AUTO_INCREMENT,
  `booking_id` varchar(50) NOT NULL,
  `customer_id` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `room_id` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `stay_length` int NOT NULL,
  `amount_paid` double NOT NULL,
  `booked_on` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `checkin_date` timestamp NULL DEFAULT NULL,
  `end_date` timestamp NULL DEFAULT NULL,
  `status` int NOT NULL DEFAULT '0',
  PRIMARY KEY (`booking_id`),
  UNIQUE KEY `sn` (`sn`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `bookings`
--

INSERT INTO `bookings` (`sn`, `booking_id`, `customer_id`, `room_id`, `stay_length`, `amount_paid`, `booked_on`, `checkin_date`, `end_date`, `status`) VALUES
(1, '295ac26a-ce6d-43e6-b54e-a55f67019bd8', 'e7f3fdd4-edd1-4759-8b5b-624ba735eaf5', '6090e620-eb8a-474c-902d-3566c7cd0f7c', 4, 23000, '2022-10-24 15:44:37', NULL, NULL, 0);

-- --------------------------------------------------------

--
-- Table structure for table `customers`
--

DROP TABLE IF EXISTS `customers`;
CREATE TABLE IF NOT EXISTS `customers` (
  `sn` int NOT NULL AUTO_INCREMENT,
  `customer_id` varchar(50) NOT NULL,
  `name` varchar(100) NOT NULL,
  `phone` varchar(14) NOT NULL,
  `email` varchar(100) NOT NULL,
  `dated` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`customer_id`),
  UNIQUE KEY `sn` (`sn`),
  UNIQUE KEY `email` (`email`),
  UNIQUE KEY `phone` (`phone`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `customers`
--

INSERT INTO `customers` (`sn`, `customer_id`, `name`, `phone`, `email`, `dated`) VALUES
(1, 'e7f3fdd4-edd1-4759-8b5b-624ba735eaf5', 'Olawale Aro', '09062741993', 'aro.olawale1@gmail.com', '2022-10-21 15:12:52');

-- --------------------------------------------------------

--
-- Table structure for table `rooms`
--

DROP TABLE IF EXISTS `rooms`;
CREATE TABLE IF NOT EXISTS `rooms` (
  `sn` int NOT NULL AUTO_INCREMENT,
  `room_id` varchar(100) NOT NULL,
  `refno` varchar(20) NOT NULL,
  `type` varchar(50) NOT NULL,
  `price` double NOT NULL,
  `status` int NOT NULL DEFAULT '0',
  PRIMARY KEY (`room_id`),
  UNIQUE KEY `sn` (`sn`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `rooms`
--

INSERT INTO `rooms` (`sn`, `room_id`, `refno`, `type`, `price`, `status`) VALUES
(1, '6090e620-eb8a-474c-902d-3566c7cd0f7c', '6090e620', 'Standard', 2500, 0);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
