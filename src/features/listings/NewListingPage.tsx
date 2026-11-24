import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import { useCreateListingMutation } from "../../app/api";
import { getErrorMessage } from "../../app/apiError";
import { CATEGORY_LABELS, CITIES } from "../../app/labels";
import { useCurrentUser } from "../users/CurrentUserContext";

const newListingSchema = z.object({
  title: z.string().trim().min(1, "El título es obligatorio"),
  description: z.string().trim().min(1, "La descripción es obligatoria"),
  price: z
    .number({ invalid_type_error: "Introduce un número válido" })
    .min(0, "El precio no puede ser negativo"),
  category: z.string().min(1, "Elige una categoría"),
  city: z.string().min(1, "Elige una ciudad"),
});

type NewListingFormData = z.infer<typeof newListingSchema>;

export function NewListingPage() {
  const { user } = useCurrentUser();
  const navigate = useNavigate();
  const [createListing, { isLoading }] = useCreateListingMutation();
  const [apiError, setApiError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<NewListingFormData>({
    resolver: zodResolver(newListingSchema),
    defaultValues: {
      title: "",
      description: "",
      category: "",
      city: "",
    },
  });

  async function onSubmit(data: NewListingFormData) {
    setApiError(null);
    try {
      const created = await createListing({
        ...data,
        sellerId: user.id,
        status: "AVAILABLE",
        views: 0,
        publishedAt: new Date().toISOString(),
        seller: user,
        attributes: {},
      }).unwrap();

      navigate(`/listings/${created.id}`);
    } catch (e) {
      setApiError(getErrorMessage(e));
    }
  }

  return (
    <div style={{ maxWidth: 640, margin: "0 auto" }}>
      <h1>Publicar un anuncio</h1>

      <form onSubmit={handleSubmit(onSubmit)}>
        {apiError && (
          <p className="error" role="alert">
            {apiError}
          </p>
        )}

        <div>
          <label htmlFor="title">Título</label>
          <input id="title" type="text" {...register("title")} />
          {errors.title && (
            <p className="field-error">{errors.title.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="description">Descripción</label>
          <textarea
            id="description"
            rows={3}
            {...register("description")}
          />
          {errors.description && (
            <p className="field-error">{errors.description.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="price">Precio (€)</label>
          <input
            id="price"
            type="number"
            min="0"
            step="any"
            {...register("price", { valueAsNumber: true })}
          />
          {errors.price && (
            <p className="field-error">{errors.price.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="category">Categoría</label>
          <select id="category" {...register("category")}>
            <option value="">Elige una categoría</option>
            {Object.entries(CATEGORY_LABELS).map(([value, label]) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </select>
          {errors.category && (
            <p className="field-error">{errors.category.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="city">Ciudad</label>
          <select id="city" {...register("city")}>
            <option value="">Elige una ciudad</option>
            {CITIES.map((city) => (
              <option key={city} value={city}>
                {city}
              </option>
            ))}
          </select>
          {errors.city && (
            <p className="field-error">{errors.city.message}</p>
          )}
        </div>

        <p style={{ margin: "8px 0", fontSize: 14 }}>
          Se publicará a nombre de <strong>{user.name}</strong>
        </p>

        <button type="submit" disabled={isLoading}>
          {isLoading ? "Publicando..." : "Publicar anuncio"}
        </button>
      </form>
    </div>
  );
}
