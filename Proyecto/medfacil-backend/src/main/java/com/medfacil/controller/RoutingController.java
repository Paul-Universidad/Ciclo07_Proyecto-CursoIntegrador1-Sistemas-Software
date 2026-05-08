package com.medfacil.controller;

import java.util.List;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import com.medfacil.api.dto.AdviceRequest;
import com.medfacil.api.dto.QuizAnswerRequest;
import com.medfacil.application.dto.MedicationForm;
import com.medfacil.application.service.AdviceService;
import com.medfacil.application.service.HomeApplicationService;
import com.medfacil.application.service.MedicationService;
import com.medfacil.application.service.QuizService;
import com.medfacil.shared.exception.ResourceNotFoundException;

import jakarta.validation.Valid;

/**
 * Vistas JSP alineadas al prototipo APF (Fig. 3–7).
 */
@Controller
public class RoutingController {

    private final HomeApplicationService homeApplicationService;
    private final MedicationService medicationService;
    private final QuizService quizService;
    private final AdviceService adviceService;

    public RoutingController(
            HomeApplicationService homeApplicationService,
            MedicationService medicationService,
            QuizService quizService,
            AdviceService adviceService) {
        this.homeApplicationService = homeApplicationService;
        this.medicationService = medicationService;
        this.quizService = quizService;
        this.adviceService = adviceService;
    }

    @GetMapping("/")
    public String root() {
        return "redirect:/inicio";
    }

    @GetMapping("/inicio")
    public String inicio(Model model) {
        model.addAttribute("pageTitle", "Inicio — MedFacil");
        model.addAttribute("navSection", "inicio");
        model.addAttribute("summary", homeApplicationService.summary());
        return "inicio";
    }

    @GetMapping("/panel")
    public String panel(Model model) {
        model.addAttribute("pageTitle", "Panel — MedFacil");
        model.addAttribute("navSection", "panel");
        model.addAttribute("summary", homeApplicationService.summary());
        return "panel";
    }

    @GetMapping("/consulta")
    public String consulta(@RequestParam(required = false) String q, Model model) {
        model.addAttribute("pageTitle", "Consulta — MedFacil");
        model.addAttribute("navSection", "consulta");
        boolean hasQuery = q != null && !q.isBlank();
        model.addAttribute("hasQuery", hasQuery);
        model.addAttribute("query", hasQuery ? q.trim() : "");
        model.addAttribute("results", hasQuery ? medicationService.search(q) : List.of());
        return "consulta";
    }

    @GetMapping("/medicamentos")
    public String medicamentos(Model model) {
        model.addAttribute("pageTitle", "Catálogo — MedFacil");
        model.addAttribute("navSection", "catalogo");
        model.addAttribute("medications", medicationService.listAll());
        return "medicamentos";
    }

    @GetMapping("/medicamentos/nuevo")
    public String medicamentoNuevo(Model model) {
        model.addAttribute("pageTitle", "Nuevo medicamento — MedFacil");
        model.addAttribute("navSection", "catalogo");
        model.addAttribute("medicationForm", MedicationForm.empty());
        model.addAttribute("editing", false);
        return "medicamento-form";
    }

    @PostMapping("/medicamentos")
    public String medicamentoCrear(
            @Valid @ModelAttribute("medicationForm") MedicationForm form,
            BindingResult bindingResult,
            Model model,
            RedirectAttributes redirectAttributes) {
        if (bindingResult.hasErrors()) {
            model.addAttribute("pageTitle", "Nuevo medicamento — MedFacil");
            model.addAttribute("navSection", "catalogo");
            model.addAttribute("editing", false);
            return "medicamento-form";
        }
        var created = medicationService.create(form);
        redirectAttributes.addFlashAttribute("success", "Medicamento creado correctamente.");
        return "redirect:/medicamentos/" + created.getId();
    }

    @GetMapping("/medicamentos/{id}/editar")
    public String medicamentoEditar(@PathVariable Long id, Model model, RedirectAttributes redirectAttributes) {
        try {
            model.addAttribute("pageTitle", "Editar medicamento — MedFacil");
            model.addAttribute("navSection", "catalogo");
            model.addAttribute("medicationForm", MedicationForm.from(medicationService.getById(id)));
            model.addAttribute("editing", true);
            return "medicamento-form";
        } catch (ResourceNotFoundException ex) {
            redirectAttributes.addFlashAttribute("error", ex.getMessage());
            return "redirect:/medicamentos";
        }
    }

    @PostMapping("/medicamentos/{id}")
    public String medicamentoActualizar(
            @PathVariable Long id,
            @Valid @ModelAttribute("medicationForm") MedicationForm form,
            BindingResult bindingResult,
            Model model,
            RedirectAttributes redirectAttributes) {
        if (bindingResult.hasErrors()) {
            model.addAttribute("pageTitle", "Editar medicamento — MedFacil");
            model.addAttribute("navSection", "catalogo");
            model.addAttribute("editing", true);
            return "medicamento-form";
        }
        try {
            medicationService.update(id, form);
            redirectAttributes.addFlashAttribute("success", "Cambios guardados.");
            return "redirect:/medicamentos/" + id;
        } catch (ResourceNotFoundException ex) {
            redirectAttributes.addFlashAttribute("error", ex.getMessage());
            return "redirect:/medicamentos";
        }
    }

    @PostMapping("/medicamentos/{id}/eliminar")
    public String medicamentoEliminar(@PathVariable Long id, RedirectAttributes redirectAttributes) {
        try {
            medicationService.deleteById(id);
            redirectAttributes.addFlashAttribute("success", "Medicamento eliminado del catálogo.");
        } catch (ResourceNotFoundException ex) {
            redirectAttributes.addFlashAttribute("error", ex.getMessage());
        }
        return "redirect:/medicamentos";
    }

    @GetMapping("/medicamentos/{id}")
    public String medicamentoDetalle(@PathVariable Long id, Model model, RedirectAttributes redirectAttributes) {
        model.addAttribute("pageTitle", "Ficha — MedFacil");
        model.addAttribute("navSection", "consulta");
        try {
            model.addAttribute("medication", medicationService.getById(id));
            return "medicamento-detalle";
        } catch (ResourceNotFoundException ex) {
            redirectAttributes.addFlashAttribute("error", ex.getMessage());
            return "redirect:/medicamentos";
        }
    }

    @GetMapping("/repaso")
    public String repaso(Model model) {
        model.addAttribute("pageTitle", "Aprendizaje — MedFacil");
        model.addAttribute("navSection", "repaso");
        model.addAttribute("questions", quizService.listQuestions());
        return "repaso";
    }

    @PostMapping("/repaso/verificar")
    public String repasoVerificar(
            @RequestParam Long questionId,
            @RequestParam Long optionId,
            RedirectAttributes redirectAttributes) {
        try {
            var result = quizService.evaluate(new QuizAnswerRequest(questionId, optionId));
            redirectAttributes.addFlashAttribute("quizQuestionId", questionId);
            redirectAttributes.addFlashAttribute("quizCorrect", result.correct());
            redirectAttributes.addFlashAttribute("quizExplanation", result.explanation());
        } catch (ResourceNotFoundException | IllegalArgumentException ex) {
            redirectAttributes.addFlashAttribute("quizError", ex.getMessage());
        }
        return "redirect:/repaso";
    }

    @GetMapping("/consejos")
    public String consejosForm(Model model) {
        model.addAttribute("pageTitle", "Consejos — MedFacil");
        model.addAttribute("navSection", "consejos");
        return "consejos";
    }

    @PostMapping("/consejos")
    public String consejosSubmit(@RequestParam String topic, Model model) {
        model.addAttribute("pageTitle", "Consejos — MedFacil");
        model.addAttribute("navSection", "consejos");
        String t = topic == null ? "" : topic.trim();
        if (t.isEmpty()) {
            model.addAttribute("error", "Describe brevemente tus síntomas o tu duda.");
            model.addAttribute("prefillTopic", topic != null ? topic : "");
            return "consejos";
        }
        model.addAttribute("advice", adviceService.advice(new AdviceRequest(t)));
        model.addAttribute("prefillTopic", t);
        return "consejos";
    }
}
