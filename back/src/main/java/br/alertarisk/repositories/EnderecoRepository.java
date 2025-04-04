package br.alertarisk.repositories;

import br.alertarisk.models.Endereco;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface EnderecoRepository extends JpaRepository<Endereco, Long> {

    Optional<Endereco> findByUserEmail(String userEmail );
}
