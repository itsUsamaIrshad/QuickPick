import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { backendUrl, currency } from '../App'
import { toast } from 'react-toastify'
import { Package, Truck, CheckCircle, Clock, MapPin, CreditCard, Calendar, ChevronDown } from 'lucide-react'
import moment from 'moment'

const Orders = ({ token }) => {
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)
  const [expandedOrder, setExpandedOrder] = useState(null)

  const statusColors = {
    'Order Placed': 'bg-blue-100 text-blue-800',
    'Packing': 'bg-yellow-100 text-yellow-800',
    'Shipped': 'bg-purple-100 text-purple-800',
    'Out for Delivery': 'bg-orange-100 text-orange-800',
    'Delivered': 'bg-green-100 text-green-800'
  }

  const statusIcons = {
    'Order Placed': <Clock className="h-4 w-4 mr-1" />,
    'Packing': <Package className="h-4 w-4 mr-1" />,
    'Shipped': <Truck className="h-4 w-4 mr-1" />,
    'Out for Delivery': <Truck className="h-4 w-4 mr-1" />,
    'Delivered': <CheckCircle className="h-4 w-4 mr-1" />
  }

  const fetchAllOrders = async () => {
    if (!token) return
    
    try {
      setLoading(true)
      const response = await axios.post(`${backendUrl}/api/order/list`, {}, { headers: { token } })
      
      if (response.data.success) {
        setOrders(response.data.orders)
      } else {
        toast.error(response.data.message)
      }
    } catch (error) {
      console.error(error)
      toast.error('Failed to fetch orders')
    } finally {
      setLoading(false)
    }
  }

  const statusHandler = async (event, orderId) => {
    try {
      const response = await axios.post(
        `${backendUrl}/api/order/status`,
        { orderId, status: event.target.value },
        { headers: { token } }
      )

      if (response.data.success) {
        await fetchAllOrders()
        toast.success('Order status updated')
      }
    } catch (error) {
      console.error(error)
      toast.error('Failed to update order status')
    }
  }

  const toggleOrderExpand = (orderId) => {
    setExpandedOrder(expandedOrder === orderId ? null : orderId)
  }

  useEffect(() => {
    fetchAllOrders()
  }, [token])

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Order Management</h2>
        <div className="text-sm text-gray-500">
          {orders.length} {orders.length === 1 ? 'order' : 'orders'} found
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
        </div>
      ) : orders.length === 0 ? (
        <div className="text-center py-12">
          <Package className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-2 text-lg font-medium text-gray-900">No orders found</h3>
          <p className="mt-1 text-gray-500">All placed orders will appear here</p>
        </div>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => (
            <div key={order._id} className="border border-gray-200 rounded-lg overflow-hidden">
              <div 
                className="grid grid-cols-1 md:grid-cols-12 gap-4 p-4 cursor-pointer hover:bg-gray-50"
                onClick={() => toggleOrderExpand(order._id)}
              >
                <div className="md:col-span-2 flex items-center">
                  <div className="bg-gray-100 p-2 rounded-lg">
                    <Package className="h-6 w-6 text-gray-600" />
                  </div>
                  <div className="ml-3">
                    <p className="text-sm font-medium text-gray-900">Order #{order._id.slice(-6).toUpperCase()}</p>
                    <p className="text-xs text-gray-500">
                      {moment(order.date).format('MMM D, YYYY')}
                    </p>
                  </div>
                </div>

                <div className="md:col-span-3">
                  <div className="flex items-center">
                    <MapPin className="h-4 w-4 text-gray-400 mr-2" />
                    <div>
                      <p className="text-sm text-gray-900 truncate">
                        {order.address.city}, {order.address.country}
                      </p>
                      <p className="text-xs text-gray-500">
                        {order.address.street}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="md:col-span-2">
                  <div className="flex items-center">
                    <CreditCard className="h-4 w-4 text-gray-400 mr-2" />
                    <div>
                      <p className="text-sm text-gray-900 capitalize">
                        {order.paymentMethod}
                      </p>
                      <p className={`text-xs ${
                        order.payment ? 'text-green-600' : 'text-yellow-600'
                      }`}>
                        {order.payment ? 'Paid' : 'Pending'}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="md:col-span-2">
                  <p className="text-sm font-medium text-gray-900">
                    {currency}{order.amount.toFixed(2)}
                  </p>
                  <p className="text-xs text-gray-500">
                    {order.items.length} {order.items.length === 1 ? 'item' : 'items'}
                  </p>
                </div>

                <div className="md:col-span-3 flex items-center justify-between">
                  <div className="flex items-center">
                    {statusIcons[order.status]}
                    <span className={`text-xs px-2 py-1 rounded-full ${statusColors[order.status]}`}>
                      {order.status}
                    </span>
                  </div>
                  <ChevronDown className={`h-4 w-4 text-gray-400 transition-transform ${
                    expandedOrder === order._id ? 'rotate-180' : ''
                  }`} />
                </div>
              </div>

              {expandedOrder === order._id && (
                <div className="border-t border-gray-200 p-4 bg-gray-50">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div>
                      <h4 className="text-sm font-medium text-gray-900 mb-2">Customer</h4>
                      <p className="text-sm text-gray-700">
                        {order.address.firstName} {order.address.lastName}
                      </p>
                      <p className="text-sm text-gray-700 mt-1">
                        {order.address.phone}
                      </p>
                      <p className="text-sm text-gray-700 mt-1">
                        {order.address.email}
                      </p>
                    </div>

                    <div>
                      <h4 className="text-sm font-medium text-gray-900 mb-2">Shipping Address</h4>
                      <p className="text-sm text-gray-700">
                        {order.address.street}
                      </p>
                      <p className="text-sm text-gray-700">
                        {order.address.city}, {order.address.state} {order.address.zipCode}
                      </p>
                      <p className="text-sm text-gray-700">
                        {order.address.country}
                      </p>
                    </div>

                    <div>
                      <h4 className="text-sm font-medium text-gray-900 mb-2">Order Details</h4>
                      <div className="space-y-2">
                        {order.items.map((item, index) => (
                          <div key={index} className="flex justify-between">
                            <div>
                              <p className="text-sm text-gray-700">
                                {item.name} × {item.quantity}
                              </p>
                              {item.size && (
                                <p className="text-xs text-gray-500">Size: {item.size}</p>
                              )}
                            </div>
                            <p className="text-sm text-gray-700">
                              {currency}{(item.price * item.quantity).toFixed(2)}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 pt-4 border-t border-gray-200">
                    <div className="flex justify-between items-center">
                      <div>
                        <label htmlFor={`status-${order._id}`} className="block text-sm font-medium text-gray-700 mb-1">
                          Update Status
                        </label>
                        <select
                          id={`status-${order._id}`}
                          value={order.status}
                          onChange={(event) => statusHandler(event, order._id)}
                          className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm rounded-md"
                        >
                          {Object.keys(statusColors).map((status) => (
                            <option key={status} value={status}>{status}</option>
                          ))}
                        </select>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-gray-500">Order Total</p>
                        <p className="text-lg font-medium text-gray-900">
                          {currency}{order.amount.toFixed(2)}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default Orders