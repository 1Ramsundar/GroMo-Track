import supabase from "../config/supabase.js";

const Expense = {
  async getAllByUser(userId) {
    const { data, error } = await supabase
      .from("expenses")
      .select("*")
      .eq("user_id", userId)
      .order("date", { ascending: false });

    if (error) throw error;
    return data;
  },

  async create(expense) {
    const { data, error } = await supabase
      .from("expenses")
      .insert([expense])
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  async update(id, userId, updates) {
    const { data, error } = await supabase
      .from("expenses")
      .update(updates)
      .eq("id", id)
      .eq("user_id", userId)
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  async delete(id, userId) {
    const { error } = await supabase
      .from("expenses")
      .delete()
      .eq("id", id)
      .eq("user_id", userId);

    if (error) throw error;
  }
};

export default Expense;