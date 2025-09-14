import React, { useState, useEffect } from "react";
import { TrendingUp, Plus, Wrench, DollarSign, Edit, Trash2 } from "lucide-react";
import AddCarInspectionForm from "../components/AddInspectionForm";
import DeleteModal from "../components/DeleteModal"; // Import DeleteModal
import { getInspections, updateInspection, deleteInspection } from "../api/inspections.api";
import Spinner from "../components/Spinner";
import InputSearch from "../components/InputSearch";

const CarInspection = () => {
  const [inspections, setInspections] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedInspection, setSelectedInspection] = useState(null);

  const [searchTerm, setSearchTerm] = useState("");
  const filteredInspection = inspections.filter((ins) =>
    ins.carId.toString().toLowerCase().includes(searchTerm.toLowerCase())
  );

  const [modals, setModals] = useState({
    isAddModalOpen: false,
    isUpdateModalOpen: false,
    isDeleteModalOpen: false,
  });

  const closeModal = (modalName) => setModals((prev) => ({ ...prev, [modalName]: false }));
  const openModal = (modalName) => setModals((prev) => ({ ...prev, [modalName]: true }));

  const fetchInspections = async () => {
    try {
      setLoading(true);
      const res = await getInspections();
      setInspections(res?.data || []);
    } catch (err) {
      console.error("Error fetching inspections:", err);
      setInspections([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInspections();
  }, []);

  const openUpdateModal = (inspection) => {
    setSelectedInspection(inspection);
    openModal("isUpdateModalOpen");
  };

  const openDeleteModal = (inspection) => {
    setSelectedInspection(inspection);
    openModal("isDeleteModalOpen");
  };

  const handleDelete = async () => {
    try {
      await deleteInspection(selectedInspection.idInspection);
      fetchInspections();
      closeModal("isDeleteModalOpen");
    } catch (error) {
      console.error("Failed to delete inspection:", error);
    }
  };

  const totalInspections = inspections.length;
  const avgRepairCost = totalInspections
    ? (
        inspections.reduce((sum, inspection) => {
          const cost = parseFloat(
            (inspection.repairCost || "0").toString().replace(/[^0-9.]/g, "")
          );
          return sum + (isNaN(cost) ? 0 : cost);
        }, 0) / totalInspections
      ).toFixed(2)
    : 0;

  const successRate = "100%";

  const formatDateForInput = (dateString) =>
    dateString ? new Date(dateString).toISOString().split("T")[0] : "";

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex items-center justify-center">
        <Spinner />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 to-indigo-100">
      <div className="w-full flex flex-col justify-center items-center">
        <div className="w-5/6 my-4">
          <h1 className="text-3xl xl:text-4xl font-bold text-gray-900">
            Inspection Dashboard
          </h1>
          <p className="text-gray-700 text-l font-medium">
            Car Inspection Records & Analytics
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 my-4 w-5/6 gap-8">
          <div className="bg-white/80 backdrop-blur-xl rounded-2xl p-4 shadow-xl border border-white/20">
            <div className="text-gray-800 font-medium mb-2">Total Inspections</div>
            <div className="flex items-center justify-between">
              <div className="p-3 bg-blue-500 rounded-2xl">
                <Wrench className="w-6 h-6 text-white" />
              </div>
              <div className="text-3xl font-bold text-gray-900">{totalInspections}</div>
            </div>
          </div>

          <div className="bg-white/80 backdrop-blur-xl rounded-2xl p-4 shadow-xl border border-white/20">
            <div className="text-gray-800 font-medium mb-2">Average Repair Cost</div>
            <div className="flex items-center justify-between">
              <div className="p-3 bg-purple-500 rounded-2xl">
                <DollarSign className="w-6 h-6 text-white" />
              </div>
              <div className="text-3xl font-bold text-gray-900">{avgRepairCost}</div>
            </div>
          </div>

          <div className="bg-white/80 backdrop-blur-xl rounded-2xl p-4 shadow-xl border border-white/20">
            <div className="text-gray-800 font-medium mb-2">Success Rate</div>
            <div className="flex items-center justify-between">
              <div className="p-3 bg-pink-500 rounded-2xl">
                <TrendingUp className="w-6 h-6 text-white" />
              </div>
              <div className="text-3xl font-bold text-gray-900">{successRate}</div>
            </div>
          </div>
        </div>

        {/* Inspections Table */}
        <div className="w-5/6 rounded-2xl bg-white/80 backdrop-blur-xl shadow-2xl border border-white/20 mb-8 overflow-hidden">
          <div className="flex p-4 ">
            <h1 className="w-1/3 mr-5 text-2xl xl:text-3xl font-bold text-gray-900">
              Car Inspections
            </h1>
            <div className="w-full flex justify-between items-center space-x-3">
              <InputSearch value={searchTerm} onChange={setSearchTerm} />

              <button
                onClick={() => openModal("isAddModalOpen")}
                className="flex items-center space-x-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-3 py-2.5 rounded-xl font-medium hover:from-blue-700 hover:to-purple-700 transition-all duration-200 hover:shadow-md active:scale-95"
              >
                <Plus className="w-5 h-5 text-white" />
                <span className="text-sm">Add Inspection</span>
              </button>
            </div>
          </div>

          <div className="overflow-x-auto px-8 pb-6">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50/80">
                  <th className="px-3 py-3 text-left text-sm text-gray-900 uppercase tracking-wider">
                    Vehicle
                  </th>
                  <th className="px-3 py-3 text-left text-sm text-gray-900 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-3 py-3 text-left text-sm text-gray-900 uppercase tracking-wider">
                    Issues
                  </th>
                  <th className="px-3 py-3 text-left text-sm text-gray-900 uppercase tracking-wider">
                    Cost
                  </th>
                  <th className="px-3 py-3 text-left text-sm text-gray-900 uppercase tracking-wider">
                    Mileage
                  </th>
                  <th className="px-3 py-3 text-left text-sm text-gray-900 uppercase tracking-wider">
                    Notes
                  </th>
                  <th className="px-3 py-3 text-left text-sm text-gray-900 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100/50">
                {!filteredInspection.length ? (
                  <tr>
                    <td colSpan="7" className="px-8 py-12 text-center">
                      <div className="text-gray-500">
                        <Wrench className="w-12 h-12 mx-auto mb-3 opacity-50" />
                        <p className="text-lg font-medium">No inspections found</p>
                        <p className="text-sm">Add your first inspection to get started</p>
                      </div>
                    </td>
                  </tr>
                ) : (
                  filteredInspection.map((inspection) => (
                    <tr
                      key={inspection.idInspection}
                      className="group hover:bg-gradient-to-r hover:from-blue-50/50 hover:to-purple-50/50 transition-all duration-500 cursor-pointer"
                    >
                      <td className="px-3 py-3 text-left">
                        <div className="flex items-center space-x-2">
                          <div className="w-9 h-9 bg-blue-500 rounded-2xl flex items-center justify-center">
                            <Wrench className="w-4 h-4 text-white" />
                          </div>
                          <div>
                            <div className="font-medium text-gray-900 text-s">
                              {inspection.carName || `Car ${inspection.carId}`}
                            </div>
                            <div className="text-sm text-gray-500 font-medium">
                              ID: {inspection.carId}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-3 py-3 text-left">
                        <div className="text-gray-900 text-s">
                          {inspection.inspectionDate
                            ? new Date(inspection.inspectionDate).toLocaleDateString("en-US")
                            : "N/A"}
                        </div>
                      </td>
                      <td className="px-3 py-3 text-left">
                        <div className="text-gray-900">{inspection.issues || "No issues"}</div>
                      </td>
                      <td className="px-3 py-3 text-left">
                        <div className="flex items-center">
                          <span className="text-lg font-medium text-gray-900">
                            {inspection.repairCost || "0"}KDZ
                          </span>
                        </div>
                      </td>
                      <td className="px-3 py-3 text-left">
                        <div className="text-gray-900">{inspection.mileage || "N/A"}</div>
                      </td>
                      <td className="px-3 py-3 text-left">
                        <div className="text-gray-900 text-s">
                          {inspection.notes || "No notes"}
                        </div>
                      </td>
                      <td className="px-3 py-3 text-left">
                        <div className="flex space-x-2">
                          <button
                            onClick={() => openUpdateModal(inspection)}
                            className="flex items-center space-x-2 text-blue-600 hover:text-blue-800"
                          >
                            <Edit className="w-4 h-4" />
                            <span>Edit</span>
                          </button>
                          <button
                            onClick={() => openDeleteModal(inspection)}
                            className="flex items-center space-x-2 text-red-600 hover:text-red-800"
                          >
                            <Trash2 className="w-4 h-4" />
                            <span>Delete</span>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Add Inspection Modal */}
      {modals.isAddModalOpen && (
        <div className="fixed inset-0 bg-gray-600/50 bg-opacity-50 flex justify-center items-center z-50">
          <div className="w-full max-w-md bg-transparent rounded-lg p-6">
            <AddCarInspectionForm
              closeModal={() => closeModal("isAddModalOpen")}
              onSuccess={() => {
                fetchInspections();
                closeModal("isAddModalOpen");
              }}
            />
          </div>
        </div>
      )}

      {/* Update Inspection Modal */}
      {modals.isUpdateModalOpen && selectedInspection && (
        <div className="fixed inset-0 bg-gray-600/50 bg-opacity-50 flex justify-center items-center z-50">
          <div className="w-full max-w-md bg-white rounded-lg p-6">
            <h2 className="text-2xl font-bold mb-4">Update Inspection</h2>
            <form
              onSubmit={async (e) => {
                e.preventDefault();
                try {
                  await updateInspection(selectedInspection.idInspection, selectedInspection);
                  fetchInspections();
                  closeModal("isUpdateModalOpen");
                } catch (error) {
                  console.error("Failed to update inspection:", error);
                }
              }}
            >
              {["inspectionDate", "issues", "repairCost", "mileage", "notes"].map((field) => (
                <div className="mb-4" key={field}>
                  <label className="block text-sm font-medium text-gray-700">{field}</label>
                  <input
                    type={field === "inspectionDate" ? "date" : "text"}
                    value={selectedInspection[field]}
                    onChange={(e) =>
                      setSelectedInspection({ ...selectedInspection, [field]: e.target.value })
                    }
                    className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                </div>
              ))}
              <div className="flex justify-end space-x-4">
                <button
                  type="button"
                  onClick={() => closeModal("isUpdateModalOpen")}
                  className="px-4 py-2 bg-gray-300 rounded-md hover:bg-gray-400 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                >
                  Update
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Inspection Modal */}
      {modals.isDeleteModalOpen && selectedInspection && (
        <DeleteModal
          title="Delete Inspection"
          message={`Are you sure you want to delete the inspection for ${
            selectedInspection.carName || `Car ${selectedInspection.carId}`
          }?`}
          deleteAction={handleDelete}
          closeModal={() => closeModal("isDeleteModalOpen")}
        />
      )}
    </div>
  );
};

export default CarInspection;
