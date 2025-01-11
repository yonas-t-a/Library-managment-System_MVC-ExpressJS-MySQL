import { pool } from "../database.js";
import IdGenerator from "../model/reusableFunctions/functionToCreateID.js";

// Create a shelf
export const createShelves = async (req, res) => {
    const { shelveDescription, capacity, sh_adminID, sh_brancheID } = req.body;

    try {
        const shelveCode = await IdGenerator("shelveCode", "shelves", "shelve");

        const query = `
            INSERT INTO shelves (shelveCode, shelveDescription, capacity, sh_adminID, sh_brancheID)
            VALUES (?, ?, ?, ?, ?)
        `;

        await pool.query(query, [shelveCode, shelveDescription, capacity, sh_adminID, sh_brancheID]);

        res.status(201).json({ message: "Shelf created successfully", shelveCode });
    } catch (error) {
        console.error("Error creating shelf:", error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

// Get all shelves
export const getAllShelves = async (req, res) => {
    try {
        const query = "SELECT * FROM shelves";
        const [rows] = await pool.query(query);
        res.status(200).json(rows);
    } catch (error) {
        console.error("Error fetching shelves:", error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

// Get a shelf by ID
export const getShelvesById = async (req, res) => {
    const { id } = req.params;

    try {
        const query = "SELECT * FROM shelves WHERE shelveCode = ?";
        const [rows] = await pool.query(query, [id]);

        if (rows.length === 0) {
            return res.status(404).json({ error: "Shelf not found" });
        }

        res.status(200).json(rows[0]);
    } catch (error) {
        console.error("Error fetching shelf by ID:", error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

// Update a shelf
export const updateShelves = async (req, res) => {
    const { id } = req.params;
    const { shelveDescription, capacity, sh_adminID, sh_brancheID } = req.body;

    try {
        const query = `
            UPDATE shelves
            SET shelveDescription = ?, capacity = ?, sh_adminID = ?, sh_brancheID = ?
            WHERE shelveCode = ?
        `;

        const [result] = await pool.query(query, [shelveDescription, capacity, sh_adminID, sh_brancheID, id]);

        if (result.affectedRows === 0) {
            return res.status(404).json({ error: "Shelf not found" });
        }

        res.status(200).json({ message: "Shelf updated successfully" });
    } catch (error) {
        console.error("Error updating shelf:", error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

// Delete a shelf
export const deleteShelves = async (req, res) => {
    const { id } = req.params;

    try {
        const query = "DELETE FROM shelves WHERE shelveCode = ?";
        const [result] = await pool.query(query, [id]);

        if (result.affectedRows === 0) {
            return res.status(404).json({ error: "Shelf not found" });
        }

        res.status(200).json({ message: "Shelf deleted successfully" });
    } catch (error) {
        console.error("Error deleting shelf:", error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

