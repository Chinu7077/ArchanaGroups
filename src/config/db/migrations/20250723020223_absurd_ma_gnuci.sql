CREATE TABLE "admins" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"username" text NOT NULL,
	"password" text NOT NULL,
	"email" text,
	"full_name" text,
	"role" text DEFAULT 'admin' NOT NULL,
	"is_active" boolean DEFAULT true NOT NULL,
	"permissions" jsonb,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	"last_login" timestamp with time zone,
	CONSTRAINT "admins_username_unique" UNIQUE("username")
);
--> statement-breakpoint
CREATE TABLE "diesel_data" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"date" date NOT NULL,
	"vehicle_number" text NOT NULL,
	"volume" numeric(10, 3) NOT NULL,
	"item" text NOT NULL,
	"fuel_station" text NOT NULL,
	"status" text NOT NULL,
	"partner_id" uuid,
	"price_per_liter" double precision,
	"total_amount" double precision,
	"driver_name" text,
	"fuel_type" text DEFAULT 'diesel' NOT NULL,
	"odometer" bigint,
	"bill_number" text,
	"notes" text,
	"metadata" jsonb,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "dispatch_data" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"date" date NOT NULL,
	"vehicle_number" text NOT NULL,
	"material" text NOT NULL,
	"quantity" numeric(12, 3) NOT NULL,
	"destination" text NOT NULL,
	"owner_name" text NOT NULL,
	"partner_id" uuid,
	"driver_name" text,
	"driver_phone" text,
	"loading_time" timestamp with time zone,
	"unloading_time" timestamp with time zone,
	"status" text DEFAULT 'pending' NOT NULL,
	"notes" text,
	"metadata" jsonb,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "partners" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" text NOT NULL,
	"partner_id" text NOT NULL,
	"password" text NOT NULL,
	"email" text,
	"phone" text,
	"is_active" boolean DEFAULT true NOT NULL,
	"metadata" jsonb,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	"last_login" timestamp with time zone,
	CONSTRAINT "partners_partner_id_unique" UNIQUE("partner_id")
);
--> statement-breakpoint
CREATE TABLE "support_queries" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"partner_id" uuid,
	"subject" text NOT NULL,
	"message" text NOT NULL,
	"status" text DEFAULT 'pending' NOT NULL,
	"priority" text DEFAULT 'normal' NOT NULL,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now(),
	"resolved_at" timestamp,
	"response" text
);
--> statement-breakpoint
ALTER TABLE "diesel_data" ADD CONSTRAINT "diesel_data_partner_id_partners_id_fk" FOREIGN KEY ("partner_id") REFERENCES "public"."partners"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "dispatch_data" ADD CONSTRAINT "dispatch_data_partner_id_partners_id_fk" FOREIGN KEY ("partner_id") REFERENCES "public"."partners"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "support_queries" ADD CONSTRAINT "support_queries_partner_id_partners_id_fk" FOREIGN KEY ("partner_id") REFERENCES "public"."partners"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "admins_role_idx" ON "admins" USING btree ("role");--> statement-breakpoint
CREATE INDEX "admins_is_active_idx" ON "admins" USING btree ("is_active");--> statement-breakpoint
CREATE INDEX "admins_created_at_idx" ON "admins" USING btree ("created_at");--> statement-breakpoint
CREATE INDEX "diesel_data_date_idx" ON "diesel_data" USING btree ("date");--> statement-breakpoint
CREATE INDEX "diesel_data_vehicle_idx" ON "diesel_data" USING btree ("vehicle_number");--> statement-breakpoint
CREATE INDEX "diesel_data_partner_idx" ON "diesel_data" USING btree ("partner_id");--> statement-breakpoint
CREATE INDEX "diesel_data_fuel_station_idx" ON "diesel_data" USING btree ("fuel_station");--> statement-breakpoint
CREATE INDEX "diesel_data_status_idx" ON "diesel_data" USING btree ("status");--> statement-breakpoint
CREATE INDEX "diesel_data_fuel_type_idx" ON "diesel_data" USING btree ("fuel_type");--> statement-breakpoint
CREATE INDEX "diesel_data_created_at_idx" ON "diesel_data" USING btree ("created_at");--> statement-breakpoint
CREATE INDEX "dispatch_data_date_idx" ON "dispatch_data" USING btree ("date");--> statement-breakpoint
CREATE INDEX "dispatch_data_vehicle_idx" ON "dispatch_data" USING btree ("vehicle_number");--> statement-breakpoint
CREATE INDEX "dispatch_data_partner_idx" ON "dispatch_data" USING btree ("partner_id");--> statement-breakpoint
CREATE INDEX "dispatch_data_material_idx" ON "dispatch_data" USING btree ("material");--> statement-breakpoint
CREATE INDEX "dispatch_data_status_idx" ON "dispatch_data" USING btree ("status");--> statement-breakpoint
CREATE INDEX "dispatch_data_owner_name_idx" ON "dispatch_data" USING btree ("owner_name");--> statement-breakpoint
CREATE INDEX "dispatch_data_created_at_idx" ON "dispatch_data" USING btree ("created_at");--> statement-breakpoint
CREATE INDEX "partners_name_idx" ON "partners" USING btree ("name");--> statement-breakpoint
CREATE INDEX "partners_is_active_idx" ON "partners" USING btree ("is_active");--> statement-breakpoint
CREATE INDEX "partners_created_at_idx" ON "partners" USING btree ("created_at");