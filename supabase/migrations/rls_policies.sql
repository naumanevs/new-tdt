/*
  # RLS Policies
  1. Policies: credits_insert_policy, credits_update_policy, credits_delete_policy
*/
CREATE POLICY credits_insert_policy ON credits FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);
CREATE POLICY credits_update_policy ON credits FOR UPDATE TO authenticated USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);
CREATE POLICY credits_delete_policy ON credits FOR DELETE TO authenticated USING (auth.uid() = user_id);
