CREATE POLICY "public read access for tutorial"
ON public.tutorial
FOR SELECT USING (
  true
);

CREATE POLICY "insert only for ADMIN users for tutorial"
ON public.tutorial
FOR INSERT
TO authenticated WITH CHECK (check_user_permission(auth.uid(), array['ADMIN']));

CREATE POLICY "update only for ADMIN users for tutorial"
ON public.tutorial
FOR UPDATE
TO authenticated USING (check_user_permission(auth.uid(), array['ADMIN'])) WITH CHECK (check_user_permission(auth.uid(), array['ADMIN']));