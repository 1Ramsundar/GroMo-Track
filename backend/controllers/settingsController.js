import supabase from "../config/supabase.js";

export const getSettings = async (req, res) => {
  try {
    const { data, error } = await supabase
      .from("user_settings")
      .select("*")
      .eq("user_id", req.user.id)
      .single();

    if (error && error.code !== "PGRST116") {
      throw error;
    }

    if (!data) {
      return res.json({
        success: true,
        settings: {
            theme: "light",
            currency: "INR",
            language: "English",
            notifications: {
                budgetAlerts: true,
                weeklySummary: true,
            },
        },
      });
    }

    res.json({
      success: true,
      settings: data,
    });

  } catch (err) {
    console.error(err);

    res.status(500).json({
      success: false,
      message: "Failed to load settings",
    });
  }
};

export const updateSettings = async (req, res) => {
  try {

    const {
      theme,
      currency,
      language,
      notifications,
    } = req.body;

    const { data: existing } = await supabase
      .from("user_settings")
      .select("id")
      .eq("user_id", req.user.id)
      .single();

    if (existing) {

      const { error } = await supabase
        .from("user_settings")
        .update({
          theme,
          currency,
          language,
          notifications,
          updated_at: new Date().toISOString(),
        })
        .eq("user_id", req.user.id);

      if (error) throw error;

    } else {

      const { error } = await supabase
        .from("user_settings")
        .insert({
          user_id: req.user.id,
          theme,
          currency,
          language,
          notifications,
        });

      if (error) throw error;
    }

    res.json({
      success: true,
      message: "Settings updated successfully.",
    });

  } catch (err) {

    console.error(err);

    res.status(500).json({
      success: false,
      message: "Failed to update settings.",
    });

  }
};