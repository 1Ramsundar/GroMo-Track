import supabase from "../config/supabase.js";

// Get Budget
export const getBudget = async (req, res) => {
    try {

        const { data, error } = await supabase
            .from("budgets")
            .select("*")
            .eq("user_id", req.user.id)
            .single();

        if (error && error.code !== "PGRST116") {
            return res.status(500).json({
                success: false,
                message: error.message
            });
        }

        res.json({
            success: true,
            budget: data || null
        });

    } catch (err) {

        res.status(500).json({
            success: false,
            message: err.message
        });

    }
};

// Create / Update Budget
export const saveBudget = async (req, res) => {

    try {

        const { monthlyBudget, categoryBudgets } = req.body;

        const { data: existing } = await supabase
            .from("budgets")
            .select("id")
            .eq("user_id", req.user.id)
            .single();

        let response;

        if (existing) {

            response = await supabase
                .from("budgets")
                .update({
                    monthly_budget: monthlyBudget,
                    category_budgets: categoryBudgets,
                    updated_at: new Date()
                })
                .eq("user_id", req.user.id);

        } else {

            response = await supabase
                .from("budgets")
                .insert([
                    {
                        user_id: req.user.id,
                        monthly_budget: monthlyBudget,
                        category_budgets: categoryBudgets
                    }
                ]);

        }

        if (response.error) {

            return res.status(500).json({
                success: false,
                message: response.error.message
            });

        }

        res.json({
            success: true,
            message: "Budget saved successfully"
        });

    } catch (err) {

        res.status(500).json({
            success: false,
            message: err.message
        });

    }

};