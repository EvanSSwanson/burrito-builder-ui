export const getOrders = () => {
  return fetch("http://localhost:3001/api/v1/orders")
      .then(response => response.json())
}

export const postOrder = (newOrder) => {
  return fetch("http://localhost:3001/api/v1/orders", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(newOrder)
  })
  .then(response => response.json())
}

export const deleteOrder = (orderId) => {
  return fetch("http://localhost:3001/api/v1/orders/" + orderId, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json"
    }
  })
  .then(response => response.json())
}