#!/bin/bash

echo "🎮 Testing Roast Grader API"
echo "=========================="

# Test 1: Basic functionality
echo "Test 1: Basic roast vs Elon"
curl -X POST http://localhost:3000/api/roast-grader \
  -H "Content-Type: application/json" \
  -d '{"roastText": "Your rockets explode more than your marriages", "target": "elon"}' \
  --silent | jq .

echo -e "\n"

# Test 2: Super effective vs Trump
echo "Test 2: Psychic attack vs Trump (should be super effective)"
curl -X POST http://localhost:3000/api/roast-grader \
  -H "Content-Type: application/json" \
  -d '{"roastText": "Your intellect is as stable as your business empire", "target": "trump"}' \
  --silent | jq .

echo -e "\n"

# Test 3: Error handling - invalid target
echo "Test 3: Invalid target"
curl -X POST http://localhost:3000/api/roast-grader \
  -H "Content-Type: application/json" \
  -d '{"roastText": "test", "target": "biden"}' \
  --silent | jq .

echo -e "\n"

# Test 4: Error handling - missing parameters
echo "Test 4: Missing roastText"
curl -X POST http://localhost:3000/api/roast-grader \
  -H "Content-Type: application/json" \
  -d '{"target": "elon"}' \
  --silent | jq .

echo -e "\n"

# Test 5: Check API status
echo "Test 5: API Status"
curl -X GET http://localhost:3000/api/roast-grader \
  --silent | jq .

echo -e "\n✅ All tests completed!"
