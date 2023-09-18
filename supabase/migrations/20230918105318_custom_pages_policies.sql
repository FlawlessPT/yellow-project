CREATE POLICY "public read access for custom_pages"
ON public.custom_pages
FOR SELECT USING (
  true
);

CREATE POLICY "insert only for ADMIN users for custom_pages"
ON public.custom_pages
FOR INSERT
TO authenticated WITH CHECK (check_user_permission(auth.uid(), array['ADMIN']));

CREATE POLICY "update only for ADMIN users for custom_pages"
ON public.custom_pages
FOR UPDATE
TO authenticated USING (check_user_permission(auth.uid(), array['ADMIN'])) WITH CHECK (check_user_permission(auth.uid(), array['ADMIN']));