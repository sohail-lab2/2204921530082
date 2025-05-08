# Number Average Calculator Microservice

A microservice that calculates averages of different types of numbers (prime, fibonacci, even, and random) using a sliding window approach.

## Features

- REST API endpoint for fetching different types of numbers
- Sliding window implementation for maintaining number history
- Real-time average calculation
- Authentication with third-party service
- MVC architecture for clean code organization

## Prerequisites

- Node.js (v14 or higher)
- npm (Node Package Manager)

## Installation

1. Clone the repository:
```bash
git clone https://github.com/sohail-lab2/2204921530082
cd 2204921530082
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the root directory with the following variables:
```env
BASE_URL=http://20.244.56.144/evaluation-service
WINDOW_SIZE=10
CLIENT_ID=your_client_id
CLIENT_SECRET=your_client_secret
NAME=your_name
ACCESS_CODE=your_access_code
EMAIL=your_email
ROLL_NO=your_roll_no
```

## Project Structure

```
src/
├── controllers/
│   └── NumberController.ts    # Request handling logic
├── models/
│   └── NumberStore.ts         # Data storage and calculations
├── services/
│   └── NumberService.ts       # External API communication
├── types.ts                   # Type definitions
└── index.ts                   # Application entry point
```

## Usage

1. Start the server:
```bash
npm start
```

2. The server will run on `http://localhost:3000`

3. Available endpoints:
- `GET /numbers/p` - Get prime numbers
- `GET /numbers/f` - Get fibonacci numbers
- `GET /numbers/e` - Get even numbers
- `GET /numbers/r` - Get random numbers

4. Example response:
```json
{
    "windowPrevState": [],
    "windowCurrState": [2, 3, 5, 7, 11],
    "numbers": [2, 3, 5, 7, 11],
    "avg": 5.6
}
```

## API Response Format

- `windowPrevState`: Previous state of the number window
- `windowCurrState`: Current state of the number window
- `numbers`: Newly received numbers
- `avg`: Average of the current window numbers

## Error Handling

The API returns appropriate error responses:
- 400: Invalid number type
- 500: Server error or third-party service failure

## Architecture

The project follows the MVC (Model-View-Controller) pattern:
- **Model**: Handles data storage and calculations
- **Service**: Manages external API communication
- **Controller**: Processes requests and responses

## License

ISC 