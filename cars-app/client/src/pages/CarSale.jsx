import React, { useEffect, useState } from "react";
import {
  TrendingUp,
  CheckCircle,
  Calendar,
  Plus,
  Car,
  DollarSign,
  XCircle,
  Edit,
  Trash2,
} from "lucide-react";
import AddCarSaleForm from "../components/AddCarSaleForm";
import DeleteModal from "../components/DeleteModal";
import { getSales, updateSale, deleteSale } from "../api/sales.api";
import Spinner from "../components/Spinner";
import InputSearch from "../components/InputSearch";

const CarSale = () => {
  const [sales, setSales] = useState([]);
  const [successRate, setSuccessRate] = useState(0);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedSale, setSelectedSale] = useState(null);

  const [searchTerm, setSearchTerm] = useState("");
  const filteredSales = sales.filter((sale) =>
    sale.carId.toString().toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalSales = sales.length;
  const averageSaleAmount =
    totalSales > 0
      ? (
          sales.reduce((sum, sale) => {
            const amount = parseFloat(
              (sale.saleAmount || "0").toString().replace(/[^0-9.]/g, "")
            );
            return sum + (isNaN(amount) ? 0 : amount);
          }, 0) / totalSales
        ).toFixed(2)
      : 0;

  const fetchSales = async () => {
    try {
      setLoading(true);
      const res = await getSales();
      if (res && res.data && Array.isArray(res.data)) {
        setSales(res.data);
        setSuccessRate(res.successRate || 0);
      } else {
        setSales([]);
      }
    } catch (err) {
      console.error("Error fetching sales:", err);
      setSales([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSales();
  }, []);

  const closeModal = () => setIsModalOpen(false);
  const closeUpdateModal = () => setIsUpdateModalOpen(false);
  const closeDeleteModal = () => setIsDeleteModalOpen(false);

  const openUpdateModal = (sale) => {
    setSelectedSale(sale);
    setIsUpdateModalOpen(true);
  };

  const openDeleteModal = (sale) => {
    setSelectedSale(sale);
    setIsDeleteModalOpen(true);
  };

  const handleDelete = async () => {
    try {
      await deleteSale(selectedSale.idSale);
      fetchSales();
      closeDeleteModal();
    } catch (error) {
      console.error("Failed to delete sale:", error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex items-center justify-center">
        <Spinner />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="w-full flex flex-col justify-center items-center">
        <div className="w-5/6 my-4">
          <h1 className="text-3xl xl:text-4xl font-bold text-gray-900 ">Sales Dashboard</h1>
          <p className="text-gray-700 text-l font-medium">Advanced Analytics & Records</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 my-4 w-5/6 gap-8">
          <div className="bg-white/80 backdrop-blue-xl rounded-2xl p-4 shadow-xl border border-white/20">
            <div className="text-gray-800 font-medium mb-2">Total Sales</div>
            <div className="flex items-center justify-between ">
              <div className="p-3 bg-blue-500 rounded-2xl">
                <Car className="w-6 h-6 text-white" />
              </div>
              <div className="text-3xl font-bold text-gray-900 ">{totalSales}</div>
            </div>
          </div>

          <div className="bg-white/80 backdrop-purple-xl rounded-2xl p-4 shadow-xl border border-white/20">
            <div className="text-gray-600 font-medium mb-2">Average Sale</div>
            <div className="flex items-center justify-between ">
              <div className="p-3 bg-purple-500 rounded-2xl">
                <DollarSign className="w-6 h-6 text-white" />
              </div>
              <div className="text-3xl font-bold text-gray-900">{averageSaleAmount}</div>
            </div>
          </div>

          <div className="bg-white/80 backdrop-pink-xl rounded-2xl p-4 shadow-xl border border-white/20">
            <div className="text-gray-600 font-medium mb-2 ">Success Rate</div>
            <div className="flex items-center justify-between">
              <div className="p-3 bg-pink-500 rounded-2xl">
                <TrendingUp className="w-6 h-6 text-white" />
              </div>
              <div className="text-3xl font-bold text-gray-900 ">{successRate}</div>
            </div>
          </div>
        </div>

        <div className="w-5/6 rounded-2xl bg-white/80 backdrop-blur-xl shadow-2xl border border-white/20 mb-8 overflow-hidden">
          <div className="px-6 py-2 border-t border-gray-200/50">
            <div className="flex">
              <h1 className="mr-5 text-2xl xl:text-3xl font-bold text-gray-900">Sales</h1>
              <div className="w-full flex justify-between items-center space-x-3">
                <InputSearch value={searchTerm} onChange={setSearchTerm} />
                <button
                  onClick={() => setIsModalOpen(true)}
                  className="flex items-center space-x-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2.5 rounded-xl font-medium hover:from-blue-700 hover:to-purple-700 transition-all duration-200 hover:shadow-md active:scale-95"
                >
                  <Plus className="w-5 h-5 text-white" />
                  <span className="text-sm">Add Sale</span>
                </button>
              </div>
            </div>
          </div>
          <div className="overflow-x-auto px-8 pb-6">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50/80">
                  <th className="px-3 py-3 text-left text-sm text-gray-900 uppercase tracking-wider">
                    Vehicle ID
                  </th>
                  <th className="px-3 py-3 text-left text-sm text-gray-900 uppercase tracking-wider">
                    Sale Date
                  </th>
                  <th className="px-3 py-3 text-left text-sm text-gray-900 uppercase tracking-wider">
                    Amount
                  </th>
                  <th className="px-3 py-3 text-left text-sm text-gray-900 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100/50">
                {filteredSales.map((sale) => (
                  <tr
                    key={sale.idSale}
                    className="group hover:bg-gradient-to-r hover:from-blue-50/50 hover:to-purple-50/50 transition-all duration-500 cursor-pointer"
                  >
                    <td className="px-3 py-3 text-left">
                      <div className="flex items-center space-x-4">
                        <div className="w-9 h-9 bg-blue-500 rounded-2xl flex items-center justify-center">
                          <Car className="w-4 h-4 text-white" />
                        </div>
                        <div>
                          <div className="font-bold text-gray-900 text-lg">{sale.carName}</div>
                          <div className="text-sm text-gray-500 font-medium">{sale.carId}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-3 py-3 text-left">
                      <div className="text-gray-900 font-medium">
                        {new Date(sale.saleDate).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "numeric",
                          day: "numeric",
                        })}
                      </div>
                    </td>
                    <td className="px-3 py-3 text-left">
                      <div className="flex items-center space-x-2">
                        <span className="text-xl font-bold text-gray-900">
                          {sale.saleAmount}KDZ
                        </span>
                      </div>
                    </td>
                    <td className="px-3 py-3 text-left">
                      <div className="flex space-x-2">
                        <button
                          onClick={() => openUpdateModal(sale)}
                          className="flex items-center space-x-2 text-blue-600 hover:text-blue-800"
                        >
                          <Edit className="w-4 h-4" />
                          <span>Edit</span>
                        </button>
                        <button
                          onClick={() => openDeleteModal(sale)}
                          className="flex items-center space-x-2 text-red-600 hover:text-red-800"
                        >
                          <Trash2 className="w-4 h-4" />
                          <span>Delete</span>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-600/50 bg-opacity-50 flex justify-center items-center z-50">
          <div className="w-full max-w-md bg-transparent rounded-lg p-6">
            <AddCarSaleForm
              closeModal={closeModal}
              onSuccess={() => {
                fetchSales();
                closeModal();
              }}
            />
            <button
              onClick={closeModal}
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
            >
              &times;
            </button>
          </div>
        </div>
      )}

      {isUpdateModalOpen && selectedSale && (
        <div className="fixed inset-0 bg-gray-600/50 bg-opacity-50 flex justify-center items-center z-50">
          <div className="w-full max-w-md bg-white rounded-lg p-6">
            <h2 className="text-2xl font-bold mb-4">Update Sale</h2>
            <form
              onSubmit={async (e) => {
                e.preventDefault();
                try {
                  await updateSale(selectedSale.idSale, {
                    saleAmount: selectedSale.saleAmount,
                    status: selectedSale.status,
                  });
                  fetchSales();
                  closeUpdateModal();
                } catch (error) {
                  console.error("Failed to update sale:", error);
                }
              }}
            >
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Sale Amount</label>
                <input
                  type="number"
                  value={selectedSale.saleAmount}
                  onChange={(e) =>
                    setSelectedSale({ ...selectedSale, saleAmount: e.target.value })
                  }
                  className="w-full p-2 border rounded-md"
                  required
                />
              </div>
              <div className="flex justify-end space-x-4">
                <button
                  type="button"
                  onClick={closeUpdateModal}
                  className="px-4 py-2 bg-gray-300 rounded-md hover:bg-gray-400"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                >
                  Update
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {isDeleteModalOpen && selectedSale && (
        <DeleteModal
          title="Delete Sale"
          message={`Are you sure you want to delete the sale for ${selectedSale.carName}?`}
          deleteAction={handleDelete}
          closeModal={closeDeleteModal}
        />
      )}
    </div>
  );
};

export default CarSale;
