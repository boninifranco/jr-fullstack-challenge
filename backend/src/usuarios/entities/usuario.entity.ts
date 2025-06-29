import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'usuarios'})
export class Usuario {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 100})
    nombre: string;

    @Column({ length: 100, unique: true})
    email: string;

    @Column()
    password: string;

    @Column({ type: 'enum', enum: ['admin', 'editor', 'viewer'], default: 'viewer'})
    rol: string;

    @CreateDateColumn({ name: 'creado_en', type: 'timestamp'})
    creadoEn: Date;
}
